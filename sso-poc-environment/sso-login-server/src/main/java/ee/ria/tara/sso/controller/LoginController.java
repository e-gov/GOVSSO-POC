package ee.ria.tara.sso.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import ee.ria.tara.sso.AuthClassReference;
import ee.ria.tara.sso.DigestUtil;
import ee.ria.tara.sso.LogUtil;
import ee.ria.tara.sso.client.HydraClient;
import ee.ria.tara.sso.client.TaraClient;
import ee.ria.tara.sso.config.ApplicationConfiguration;
import ee.ria.tara.sso.config.HydraClientConfiguration;
import ee.ria.tara.sso.config.TaraClientConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/login")
public class LoginController {

    private static final String LOGIN_CHALLENGE_SESSION_PARAM = "SSO_HYDRA_LOGIN_CHALLENGE";
    private static final String LOGIN_REDIRECT_URI_SESSION_PARAM = "SSO_TARA_REDIRECT_URI";
    private static final String LOGIN_STATE_COOKIE_NAME = "sso_login_server_state";
    private static final AuthClassReference DEFAULT_ACR = AuthClassReference.SUBSTANTIAL;
    private static final String TARA_SCOPE = "openid";
    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

    @Resource
    TaraClient taraClient;
    @Resource
    HydraClient hydraClient;
    @Autowired
    HydraClientConfiguration hydraClientConfiguration;
    @Autowired
    TaraClientConfiguration taraConfiguration;
    @Autowired
    ApplicationConfiguration applicationConfiguration;
    @Autowired
    HydraSessionContextService sessionContextService;

    @GetMapping("/request")
    public RedirectView loginRequest(@RequestParam("login_challenge") String loginChallenge,
                                     HttpServletRequest request, HttpSession session, HttpServletResponse response) {
        resetAnonymousAuthenticationSession(session);
        HydraClient.LoginRequest loginRequest = hydraClient.getLoginRequest(loginChallenge);
        LOG.info("Login processing: Received login_challenge='{}', loginRequest='{}'", loginChallenge, LogUtil.asJsonString(loginRequest));
        HydraClient.SubjectInfo previousAuthenticationSessionInfo = sessionContextService.getSessionSubject(loginRequest.getSessionId());

        if (loginRequest.getSkip() && previousAuthenticationSessionInfo != null) {
            if (isTokenLevelOfAssuranceLowerThanRequested(loginRequest, previousAuthenticationSessionInfo)) {
                LOG.info("Login processing: Received login request with acr_values='{}' but " +
                                "session was created with acr='{}'. login_challenge='{}'",
                        LogUtil.asJsonString(loginRequest.getOidcContext().getAcrValues()),
                        previousAuthenticationSessionInfo.getAcr(),
                        loginChallenge);
                return handleStepUpAuthenticationRejection(response, loginRequest);
            }
            LOG.info("Login processing: Existing SSO session was found. Login request will be auto-accepted. " +
                    "login_challenge='{}'", loginChallenge);
            return handleLoginAutoAccept(loginChallenge, previousAuthenticationSessionInfo);
        } else {
            LOG.info("Login processing: Existing SSO session was not found. User will be redirected " +
                    "to TARA service for authentication. login_challenge='{}'", loginChallenge);
            return handleTaraAuthentication(loginChallenge, session, response, loginRequest);
        }
    }

    @GetMapping("/response")
    public ModelAndView loginResponse(@RequestParam(required = false) String code,
                                      @RequestParam(name = "error", required = false) String error,
                                      @RequestParam(name = "error_description", required = false) String errorDescription,
                                      @RequestParam(name = "state") String state,
                                      @CookieValue(LOGIN_STATE_COOKIE_NAME) String stateCookie,
                                      HttpServletRequest request, HttpSession session, ModelMap model) {
        LOG.info("Login processing: Received TARA login response. state='{}', error='{}', error_description='{}'", state, error, errorDescription);
        validateAuthorizationResponse(error, state, stateCookie, errorDescription, session);

        String loginChallenge = (String) session.getAttribute(LOGIN_CHALLENGE_SESSION_PARAM);
        String originalRedirectUri = (String) session.getAttribute(LOGIN_REDIRECT_URI_SESSION_PARAM);
        HydraClient.LoginRequest loginRequest = hydraClient.getLoginRequest(loginChallenge);

        LOG.info("Login processing: Requesting user ID token from TARA token endpoint. login_challenge='{}'", loginChallenge);
        TaraClient.TaraTokenResponse taraTokenResponse = taraClient.getTokenResponse(code, originalRedirectUri);

        HydraClient.SubjectInfo subjectInfo = createSubject(taraTokenResponse.getIdToken());

        if (isTokenLevelOfAssuranceLowerThanRequested(loginRequest, subjectInfo)) {
            LOG.error("Login processing: TARA authentication level of assurance is lower than requested. " +
                    "Login will be rejected and browser redirected back to client application. login_challenge='{}'", loginChallenge);
            HydraClient.CompletedRequest rejectLoginRespnose =
                    hydraClient.rejectLoginRequest(loginChallenge, "INSUFFICIENT_LOA", "User used authentication device that had lower level of assurance than requestsed.");
            return new ModelAndView("redirect:" + rejectLoginRespnose.getRedirectTo());
        }

        HydraClient.HydraSessionContext sessionContext = new HydraClient.HydraSessionContext();
        sessionContext.setNewAuthentication(true);
        sessionContext.setSubjectInfo(subjectInfo);
        sessionContextService.saveSessionSubject(loginRequest.getSessionId(), subjectInfo);

        HydraClient.CompletedRequest acceptLoginResponse = hydraClient.acceptLoginRequest(loginChallenge, sessionContext);

        return new ModelAndView("redirect:" + acceptLoginResponse.getRedirectTo());
    }

    @GetMapping("/cancel")
    public RedirectView loginCancel(HttpSession session) {
        String loginChallenge = (String) session.getAttribute(LOGIN_CHALLENGE_SESSION_PARAM);
        LOG.info("Login processing: User canceled authentication process in TARA service. " +
                "Hydra login request will be rejected and browser will be redirected back to client application. " +
                "login_challenge='{}'", loginChallenge);
        HydraClient.CompletedRequest rejectionRequest = hydraClient.rejectLoginRequest(loginChallenge, "USER_CANCELED", "User canceled TARA authentication");
        session.invalidate();
        return new RedirectView(rejectionRequest.getRedirectTo());
    }

    private RedirectView handleTaraAuthentication(@RequestParam("login_challenge") String loginChallenge, HttpSession session, HttpServletResponse response, HydraClient.LoginRequest loginRequest) {
        // Save login reference to login application cookie for processing after TARA authentication
        String state = UUID.randomUUID().toString();
        String stateDigest = DigestUtil.getSha256String(state);
        Cookie stateCookie = createStateCookie(state);
        response.addCookie(stateCookie);
        String redirectUri = applicationConfiguration.getPublicUrl() + "login/response";
        session.setAttribute(LOGIN_CHALLENGE_SESSION_PARAM, loginChallenge);
        session.setAttribute(LOGIN_REDIRECT_URI_SESSION_PARAM, redirectUri);
        LOG.info("Login processing: Redirecting browser to TARA authentication " +
                "URL='{}', login_challenge='{}'", taraConfiguration.getAuthorizationEndpoint(), loginChallenge);
        String requestedAcr = loginRequest.getOidcContext().getAcrValues() != null ? loginRequest.getOidcContext().getAcrValues()[0] : DEFAULT_ACR.name().toLowerCase();
        return getRedirectView(stateDigest, requestedAcr, redirectUri, String.join(" ", loginRequest.getRequestedScope()));
    }

    private RedirectView handleStepUpAuthenticationRejection(HttpServletResponse response, HydraClient.LoginRequest loginRequest) {
        // Session step-up is not allowed
        // Current authentication request is saved in login application storage and user is
        // redirected to Hydra logout url. After logout has been finished, logout controller will
        // restore current request and redirect user back to Hydra auth endpoint.
        Cookie postLogoutRedirectCookie = sessionContextService.createPostLogoutRedirectCookie(loginRequest.getRequestUrl());
        response.addCookie(postLogoutRedirectCookie);
        LOG.info("Login processing: Saving original authentication URL to cookie, and redirecting browser " +
                "to Hydra logout URL '/oauth2/sessions/logout'. login_challenge='{}'", loginRequest.getChallenge());
        return new RedirectView(hydraClientConfiguration.getPublicUrl() + "/oauth2/sessions/logout");
    }

    private RedirectView handleLoginAutoAccept(@RequestParam("login_challenge") String loginChallenge, HydraClient.SubjectInfo previousAuthenticationSessionInfo) {
        // Prepare sessionContext and accept login request
        HydraClient.HydraSessionContext sessionContext = new HydraClient.HydraSessionContext();
        sessionContext.setSubjectInfo(previousAuthenticationSessionInfo);
        sessionContext.setNewAuthentication(false);
        HydraClient.CompletedRequest acceptLoginResponse = hydraClient.acceptLoginRequest(loginChallenge, sessionContext);

        // Redirect back to hydra
        return new RedirectView(acceptLoginResponse.getRedirectTo());
    }

    private void resetAnonymousAuthenticationSession(HttpSession session) {
        session.removeAttribute(LOGIN_CHALLENGE_SESSION_PARAM);
        session.getAttribute(LOGIN_REDIRECT_URI_SESSION_PARAM);
    }

    private void validateAuthorizationResponse(String error, String state, String stateCookie, String errorDescription, HttpSession session) {
        if (error != null && !error.isBlank()) {
            session.invalidate();
            LOG.error("Login processing: TARA responded with error:'{}', error_description='{}'.", error, errorDescription);
            throw new RuntimeException("TARA responded with error:'" + error + "' error_description='" + errorDescription + "'.");
        }
        String stateDigest = DigestUtil.getSha256String(stateCookie);
        if (!stateDigest.equals(state)) {
            session.invalidate();
            LOG.error("Login processing: TARA authentication response 'state' attribute validation failed. " +
                    "Expected state='{}', but received state='{}'", state, stateDigest);
            throw new RuntimeException("TARA authentication response 'state' attribute validation failed. " +
                    "Expected state='" + state + "', but received state='" + stateDigest + "'.");
        }
    }

    private boolean isTokenLevelOfAssuranceLowerThanRequested(HydraClient.LoginRequest loginRequest, HydraClient.SubjectInfo sessionSubject) {
        AuthClassReference requestedAcr = DEFAULT_ACR;
        try {
            requestedAcr = AuthClassReference.valueOf(loginRequest.getOidcContext().getAcrValues()[0].toUpperCase());
        } catch (NullPointerException | IllegalArgumentException e) {
            LOG.warn("Invalid acr_values detected in login request. Using default: '" + requestedAcr.toString() + "'.", e);
        }
        AuthClassReference sessionAcr = AuthClassReference.valueOf(sessionSubject.getAcr().toUpperCase());
        return requestedAcr.getRank() > sessionAcr.getRank();
    }

    private Cookie createStateCookie(String stateDigest) {
        Cookie stateCookie = new Cookie(LOGIN_STATE_COOKIE_NAME, stateDigest);
        stateCookie.setHttpOnly(true);
        return stateCookie;
    }

    private RedirectView getRedirectView(String stateDigest, String requestedAcr, String redirectUri, String requestedScopes) {
        RedirectView returnView = new RedirectView(taraConfiguration.getAuthorizationEndpoint());
        Map<String, String> attributesMap = new LinkedHashMap<>();
        attributesMap.put("response_type", "code");
        attributesMap.put("client_id", taraConfiguration.getClientId());
        attributesMap.put("scope", requestedScopes);
        attributesMap.put("state", stateDigest);
        attributesMap.put("redirect_uri", redirectUri);
        attributesMap.put("acr_values", requestedAcr);
        returnView.setAttributesMap(attributesMap);
        return returnView;
    }

    private HydraClient.SubjectInfo createSubject(String idToken) {
        DecodedJWT decodedIDToken = JWT.decode(idToken);
        HydraClient.SubjectInfo subjectInfo = new HydraClient.SubjectInfo();
        subjectInfo.setEmail(decodedIDToken.getClaim("email") != null ? decodedIDToken.getClaim("email").asString() : null);
        Map<String, Object> profile = decodedIDToken.getClaims().get("profile_attributes").asMap();
        subjectInfo.setDateOfBirth(profile.get("date_of_birth").toString());
        subjectInfo.setFamilyName(profile.get("family_name").toString());
        subjectInfo.setGivenName(profile.get("given_name").toString());
        subjectInfo.setSubject(decodedIDToken.getSubject());
        subjectInfo.setTaraIdToken(idToken);
        String amr = parseAmr(decodedIDToken.getClaim("amr"));
        subjectInfo.setAmr(amr);
        subjectInfo.setAcr(parseAcr(amr, decodedIDToken.getClaim("acr")));
        return subjectInfo;
    }

    private String parseAmr(Claim amr) {
        return amr != null ? amr.asArray(String.class)[0] : null;
    }

    private String parseAcr(String amr, Claim acr) {
        if (acr != null) {
            acr.asString();
        }
        AuthClassReference derivedAcr = AuthClassReference.getByAmr(amr);
        if (derivedAcr == null) {
            throw new RuntimeException("Unable to determine ACR from TARA identity token. TARA did not return 'amr' nor 'acr' claim value");
        }

        return derivedAcr.name().toLowerCase();
    }

}