package ee.ria.tara.sso.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import ee.ria.tara.sso.LogUtil;
import ee.ria.tara.sso.client.HydraClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/logout")
public class LogoutController {

    private static final Logger LOG = LoggerFactory.getLogger(LogoutController.class);

    @Autowired
    HydraSessionContextService sessionStorage;
    @Autowired
    HydraClient hydraClient;

    @GetMapping("/request")
    public ModelAndView logOut(@RequestParam(name = "logout_challenge", required = true) String logoutChallenge) {
        HydraClient.LogoutRequest logoutRequest = hydraClient.getLogoutRequest(logoutChallenge);
        LOG.info("Logout processing: Received logout request. logout_challenge='{}', logoutRequest='{}'", logoutChallenge, LogUtil.asJsonString(logoutRequest));

        // Hydra does not return crucial data on logout rejection. We need to gather data from
        // the id_token_hint that was used to initiate RP logout
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(logoutRequest.getRequestUrl());
        String idTokenHint = builder.build().getQueryParams().getFirst("id_token_hint");

        if (Boolean.valueOf(logoutRequest.getRpInitiated()) == Boolean.TRUE) {
            return handleConditionalLogout(logoutRequest, logoutChallenge, idTokenHint);
        } else {
            LOG.info("Logout processing: Logout was not initiated by client application, " +
                    "id_token_hint was not found in request. logout_challenge='{}'", logoutChallenge);
            return handleAutoAcceptLogout(logoutRequest, logoutChallenge);
        }
    }

    @GetMapping("/response")
    public RedirectView acceptLogOut(@RequestParam(name = "logout_challenge", required = true) String logoutChallenge,
                                     @RequestParam(name = "logout_all_sessions", required = true) boolean shouldLogOutAllSessions) {

        HydraClient.LogoutRequest logoutRequest = hydraClient.getLogoutRequest(logoutChallenge);
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(logoutRequest.getRequestUrl());
        String idTokenHint = builder.build().getQueryParams().get("id_token_hint").get(0);
        DecodedJWT idToken = JWT.decode(idTokenHint);

        if (shouldLogOutAllSessions) {
            LOG.info("Logout processing: User opted to end whole TARA SSO session. " +
                    "Logout request will be accepted and browser will be redirected back to client application. " +
                    "logout_challenge={}'", logoutChallenge);
            HydraClient.CompletedRequest logoutResponse = hydraClient.acceptLogoutRequest(logoutChallenge);
            sessionStorage.deleteSessionSubject(logoutRequest.getSid());
            return new RedirectView(logoutResponse.getRedirectTo());
        } else {
            LOG.info("Logout processing: User opted to continue other client application sessions. " +
                    "Logout request will be rejected and only a single application consent will be deleted. " +
                    "Browser will be redirected back to client application. logout_challenge='{}'", logoutChallenge);
            hydraClient.rejectLogoutRequest(logoutChallenge, "USER_REJECTED", "User did not want to log out of TARA SSO.");
            String clientAud = idToken.getAudience().get(0);
            HydraClient.OAuth2Client client = hydraClient.getClient(clientAud);
            hydraClient.revokeConsent(client.getClientId(), idToken.getSubject());
            String returnUrl = builder.build().getQueryParams().get("post_logout_redirect_uri").get(0);
            return new RedirectView(returnUrl);
        }
    }

    @GetMapping("/redirect")
    public RedirectView opLogoutRedirect(@CookieValue(required = false, value = HydraSessionContextService.OP_LOGOUT_REDIRECT_COOKIE_NAME) String logoutUrlIdCookie, HttpServletResponse httpServletResponse) {
        if (isRegularOPInitiatedLogoutRequest(logoutUrlIdCookie)) {
            LOG.info("Logout processing: Logout request not initiated by client application. " +
                    "Browser will be redirected to TARA SSO default logout url.");
            return new RedirectView("/logout/finished", true);
        }
        String postLogoutRedirectUrl = sessionStorage.getPostLogoutRedirectUrl(logoutUrlIdCookie);
        LOG.info("Logout processing: Logout request initiated by client application." +
                "Browser will be redirected back to original URL='{}'", postLogoutRedirectUrl);
        Cookie cleanupCookie = sessionStorage.removePostLogoutRedirectCookie(postLogoutRedirectUrl);
        httpServletResponse.addCookie(cleanupCookie);
        return new RedirectView(postLogoutRedirectUrl);
    }

    @GetMapping("/finished")
    public ModelAndView opLogoutFinal(ModelMap model) {
        LOG.info("Logout processing: Logout request was invalid or error occurred while processing. " +
                "User can not be redirected back to client application. Default TARA SSO logout page will be shown instead.");
        return new ModelAndView("logout_final", model);
    }

    private ModelAndView handleConditionalLogout(HydraClient.LogoutRequest logoutRequest,
                                                 String logoutChallenge,
                                                 String idTokenHint) {

        DecodedJWT idToken = JWT.decode(idTokenHint);
        String clientAud = idToken.getAudience().get(0);
        HydraClient.OAuth2Client client = hydraClient.getClient(clientAud);
        HydraClient.PreviousConsentSession[] userConsents = hydraClient.getAllUserConsentSessions(logoutRequest.getSubject());
        List<String> otherClientNames = getOtherClientNamesFromConsentSessions(userConsents, client.getClientId(), logoutRequest.getSid());

        if (CollectionUtils.isEmpty(otherClientNames)) {
            LOG.info("Logout processing: User has logged into only a single client application. " +
                    "Logout request will be accepted and browser redirected back to client application. logout_challenge='{}'", logoutChallenge);
            return handleAutoAcceptLogout(logoutRequest, logoutChallenge);
        }

        LOG.info("Logout processing: User is authenticated in multiple other client applications. " +
                "Browser will be redirected to logout consent page. logout_challenge='{}'", logoutChallenge);
        ModelAndView logoutView = new ModelAndView("logout.html");
        logoutView.addObject("other_clients", otherClientNames);
        logoutView.addObject("logout", logoutRequest);
        logoutView.addObject("client", client);
        logoutView.addObject("logout_challenge", logoutChallenge);
        return logoutView;
    }

    private ModelAndView handleAutoAcceptLogout(HydraClient.LogoutRequest logoutRequest, String logoutChallenge) {
        HydraClient.CompletedRequest logoutResponse = hydraClient.acceptLogoutRequest(logoutChallenge);
        sessionStorage.deleteSessionSubject(logoutRequest.getSid());
        return new ModelAndView("redirect:" + logoutResponse.getRedirectTo());
    }

    private boolean isRegularOPInitiatedLogoutRequest(@CookieValue(required = false, value = HydraSessionContextService.OP_LOGOUT_REDIRECT_COOKIE_NAME) String logoutUrlIdCookie) {
        return StringUtils.isEmpty(logoutUrlIdCookie) || !sessionStorage.postLogoutUrlExists(logoutUrlIdCookie);
    }

    private List<String> getOtherClientNamesFromConsentSessions(HydraClient.PreviousConsentSession[] userConsents, String clientId, String sessionId) {
        if (userConsents == null || userConsents.length < 1) {
            return Collections.EMPTY_LIST;
        }
        List<HydraClient.PreviousConsentSession> otherClients =
                Arrays.stream(userConsents)
                        .filter(consent ->
                                !StringUtils.isEmpty(consent.getConsentRequest().getLoginSessionId()))
                        .filter(consent -> {
                            HydraClient.ConsentRequest consentRequest = consent.getConsentRequest();
                            String consentClientId = consentRequest.getClient().getClientId();
                            String consentSessionId = consentRequest.getLoginSessionId();
                            return !StringUtils.isEmpty(consentSessionId) && !(consentClientId.equals(clientId));
                        }).collect(Collectors.toList());

        if (otherClients == null || otherClients.size() == 0) {
            return Collections.EMPTY_LIST;
        }

        return otherClients.stream().map(c ->
                c.getConsentRequest().getClient().getClientName())
                .distinct()
                .collect(Collectors.toList());
    }

}