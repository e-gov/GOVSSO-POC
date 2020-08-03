package ee.ria.tara.sso.controller;

import ee.ria.tara.sso.LogUtil;
import ee.ria.tara.sso.client.HydraClient;
import ee.ria.tara.sso.config.HydraClientConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.thymeleaf.util.StringUtils;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.LinkedHashMap;

@Controller
@RequestMapping("/consent")
public class ConsentController {

    private static final Logger LOG = LoggerFactory.getLogger(ConsentController.class);

    @Resource
    HydraClient hydraClient;
    @Autowired
    HydraSessionContextService sessionContextService;
    @Autowired
    HydraClientConfiguration hydraClientConfiguration;

    @GetMapping("/request")
    public ModelAndView checkRequest(@RequestParam(name = "consent_challenge", required = true) String consentChallenge,
                                     HttpSession session, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        HydraClient.ConsentRequest consent = hydraClient.getConsentRequest(consentChallenge);
        LOG.info("Consent processing: ConsentRequest received: consent_challenge='{}', consent='{}'", consentChallenge, LogUtil.asJsonString(consent));
        if (consent.getContext().isNewAuthentication() || isValidSessionUpdateRequest(consent)) {
            LOG.info("Consent processing: Session update request detected or user authenticated during request. " +
                    "Consent will be auto-accepted. consent_chalenge='{}'", consentChallenge);
            HydraClient.CompletedRequest acceptConsentRequest = hydraClient.acceptConsentRequest(consentChallenge, consent.getContext(), consent.getRequestedScope());
            return new ModelAndView("redirect:" + acceptConsentRequest.getRedirectTo());
        } else {
            LOG.info("Consent processing: Showing consent form to user. consent_challenge='{}'", consentChallenge);
            ModelAndView result = new ModelAndView("consent");
            result.addObject("consent", consent);
            result.addObject("consent_challenge", consentChallenge);
            return result;
        }
    }

    @GetMapping("/accept")
    public RedirectView acceptConsent(@RequestParam(name = "consent_challenge", required = true) String consentChallenge,
                                      @RequestParam(name = "re_authenticate", required = true) boolean reAuthenticate,
                                      HttpServletResponse response) {
        HydraClient.ConsentRequest consent = hydraClient.getConsentRequest(consentChallenge);
        LOG.info("Consent processing: ConsentRequest response received from user. consent_challenge='{}'", consentChallenge);
        if (reAuthenticate == true) {
            LOG.info("Consent processing: User opted to re-authenticate SSO session. Saving original redirect_uri " +
                    "in cookie and redirecting browser to Hydra logout url '/oauth2/sessions/logout'. consent_challenge='{}'", consentChallenge);
            Cookie postLogoutRedirectCookie = sessionContextService.createPostLogoutRedirectCookie(consent.getRequestUrl());
            response.addCookie(postLogoutRedirectCookie);
            return new RedirectView(hydraClientConfiguration.getPublicUrl() + "/oauth2/sessions/logout");
        } else {
            LOG.info("Consent processing: User opted to continue SSO session. Sending AcceptConsent to Hydra. consent_challenge='{}'", consentChallenge);
            HydraClient.CompletedRequest acceptConsentResponse = hydraClient.acceptConsentRequest(consentChallenge, consent.getContext(), consent.getRequestedScope());
            return new RedirectView(acceptConsentResponse.getRedirectTo());
        }
    }

    @GetMapping("/reject")
    public RedirectView rejectConsent(@RequestParam(name = "consent_challenge", required = true) String consentChallenge) {
        HydraClient.ConsentRequest consent = hydraClient.getConsentRequest(consentChallenge);
        LOG.info("Consent processing: User opted to cancel logging into client application. " +
                "Rejecting consent and redirecting browser back to client application. consent_challenge='{}'", consentChallenge);
        HydraClient.CompletedRequest rejectConsentResponse = hydraClient.rejectConsentRequest(consentChallenge, "USER_CANCELED", "User rejected authenticaiton");
        return new RedirectView(rejectConsentResponse.getRedirectTo());
    }

    private boolean isValidSessionUpdateRequest(HydraClient.ConsentRequest consent) {
        if (consent.getOidcContext().getIdTokenHintClaims() == null) {
            return false;
        }
        LinkedHashMap<String, Object> idTokenHintClaims = (LinkedHashMap<String, Object>) consent.getOidcContext().getIdTokenHintClaims();
        return StringUtils.equalsIgnoreCase(consent.getSubject(), (String) idTokenHintClaims.get("sub"));
    }

}
