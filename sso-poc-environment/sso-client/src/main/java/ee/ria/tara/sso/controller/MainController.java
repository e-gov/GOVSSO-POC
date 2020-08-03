package ee.ria.tara.sso.controller;

import ee.ria.tara.sso.config.ApplicationConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    private static final Logger LOG = LoggerFactory.getLogger(MainController.class);
    @Autowired
    ApplicationConfiguration applicationConfiguration;
    @Autowired
    OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
    @Autowired
    private ApplicationContext applicationContext;

    @GetMapping("/")
    public ModelAndView index(@AuthenticationPrincipal OidcUser oidcUser, @RequestParam(name = "error", required = false) String error) {
        if (oidcUser == null) {
            LOG.info("Unauthenticated user detected. Showing index page.");
            ModelAndView model = getDefaultModel("index");
            model.addObject("favicon", applicationConfiguration.getFaviconName());
            model.addObject("error", error);
            return model;
        } else {
            LOG.info("User has been authenticated by TARA SSO, redirecting browser to dashboard. subject='{}'", oidcUser.getSubject());
            return new ModelAndView("redirect:/dashboard");
        }
    }

    @GetMapping("/dashboard")
    public ModelAndView dashboard(@AuthenticationPrincipal OidcUser oidcUser) {
        ModelAndView model = getDefaultModel("dashboard");

        LOG.info("Showing dashboard for subject='{}'", oidcUser.getSubject());
        addIdTokenDataToModel(oidcUser, model);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

        OAuth2AuthorizedClient client =
                oAuth2AuthorizedClientService.loadAuthorizedClient(
                        oauthToken.getAuthorizedClientRegistrationId(),
                        oauthToken.getName());

        addAccessTokenDataToModel(model, client);
        model.addObject("favicon", applicationConfiguration.getFaviconName());
        return model;
    }

    private void addAccessTokenDataToModel(ModelAndView model, OAuth2AuthorizedClient client) {
        if (client != null) {
            OAuth2AccessToken accessToken = client.getAccessToken();
            model.addObject("access_token", accessToken.getTokenValue());
            model.addObject("access_token_exp", accessToken.getExpiresAt());
            model.addObject("access_token_scopes", accessToken.getScopes());
            model.addObject("access_token_iat", accessToken.getIssuedAt());
            model.addObject("access_token_type", accessToken.getTokenType());
        }
    }

    private void addIdTokenDataToModel(@AuthenticationPrincipal OidcUser oidcUser, ModelAndView model) {
        model.addObject("given_name", oidcUser.getClaimAsMap("profile_attributes") != null ? oidcUser.getClaimAsMap("profile_attributes").get("given_name") : null);
        model.addObject("family_name", oidcUser.getClaimAsMap("profile_attributes") != null ? oidcUser.getClaimAsMap("profile_attributes").get("family_name") : null);
        model.addObject("date_of_birth", oidcUser.getClaimAsMap("profile_attributes") != null ? oidcUser.getClaimAsMap("profile_attributes").get("date_of_birth") : null);

        model.addObject("jti", oidcUser.getClaimAsString("jti"));
        model.addObject("iss", oidcUser.getIssuer());
        model.addObject("aud", oidcUser.getAudience());
        model.addObject("exp", oidcUser.getExpiresAt());
        model.addObject("iat", oidcUser.getIssuedAt());
        model.addObject("nbf", oidcUser.getClaimAsString("nbf"));
        model.addObject("sub", oidcUser.getSubject());
        model.addObject("amr", oidcUser.getAuthenticationMethods());
        model.addObject("state", oidcUser.getClaimAsString("state"));
        model.addObject("nonce", oidcUser.getNonce());
        model.addObject("at_hash", oidcUser.getAccessTokenHash());
        model.addObject("acr", oidcUser.getAuthenticationContextClass());
        model.addObject("id_token", oidcUser.getIdToken().getTokenValue());
        model.addObject("sid", oidcUser.getIdToken().getClaim("sid"));
    }

    private ModelAndView getDefaultModel(String view) {
        ModelAndView model = new ModelAndView(view);
        model.addObject("application_name", applicationContext.getId());
        return model;
    }

}