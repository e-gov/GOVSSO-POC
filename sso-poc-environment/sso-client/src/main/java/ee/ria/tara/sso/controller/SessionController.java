package ee.ria.tara.sso.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/session")
public class SessionController {

    private static final Logger LOG = LoggerFactory.getLogger(SessionController.class);

    @Autowired
    OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
    @Autowired
    SessionRegistry sessionRegistry;

    @CrossOrigin("*")
    @PostMapping(value = "/logout", consumes = {"application/x-www-form-urlencoded"})
    private ResponseEntity backChannelLogout(@RequestParam(name = "logout_token", required = true) String logoutToken, HttpServletRequest request) {
        HttpHeaders responseHeaders = getHttpHeaders();
        DecodedJWT decodedLogoutToken = JWT.decode(logoutToken);
        LOG.info("Received back-channel logout request for subject='{}', sid='{}'",
                decodedLogoutToken.getSubject(),
                decodedLogoutToken.getClaim("sid"));
        expireOidcSessions(decodedLogoutToken.getClaim("sid") != null ? decodedLogoutToken.getClaim("sid").asString() : null, decodedLogoutToken.getSubject());
        return new ResponseEntity<>(responseHeaders, HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Cache-Control", "no-cache, no-store");
        responseHeaders.add("Pragma", "no-cache");
        return responseHeaders;
    }

    private void expireOidcSessions(String sid, String sub) {
        if (!StringUtils.isEmpty(sid)) {
            List<DefaultOidcUser> usersBySid =
                    sessionRegistry.getAllPrincipals()
                            .stream()
                            .filter(principal -> principal instanceof DefaultOidcUser && (StringUtils.equals(((DefaultOidcUser) principal).getClaim("sid"), sid)))
                            .map(DefaultOidcUser.class::cast)
                            .collect(Collectors.toList());
            expireSessions(usersBySid);
        } else {
            List<DefaultOidcUser> usersBySub = sessionRegistry.getAllPrincipals()
                    .stream()
                    .filter(principal -> principal instanceof DefaultOidcUser && (StringUtils.equals(((DefaultOidcUser) principal).getSubject(), sub)))
                    .map(DefaultOidcUser.class::cast)
                    .collect(Collectors.toList());
            expireSessions(usersBySub);
        }
    }

    private void expireSessions(List<DefaultOidcUser> users) {
        if (CollectionUtils.isEmpty(users)) {
            return;
        }
        for (DefaultOidcUser user : users) {
            for (SessionInformation si : sessionRegistry.getAllSessions(user, false)) {
                LOG.info("Terminating client application session sid='{}', sub='{}'", si.getSessionId(), user.getSubject());
                si.expireNow();
            }
        }
    }

}
