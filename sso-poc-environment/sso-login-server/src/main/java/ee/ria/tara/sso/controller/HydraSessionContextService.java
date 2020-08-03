package ee.ria.tara.sso.controller;

import ee.ria.tara.sso.DigestUtil;
import ee.ria.tara.sso.client.HydraClient;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class HydraSessionContextService {

    public static final String OP_LOGOUT_REDIRECT_COOKIE_NAME = "sso_op_logout_redirect_id";
    private static final Map<String, HydraClient.SubjectInfo> SESSION_STORAGE = new ConcurrentHashMap<>();
    private static final Map<String, String> REGISTERED_POST_LOGOUT_URLS = new ConcurrentHashMap<>();

    public boolean sessionExists(String sessionId) {
        return SESSION_STORAGE.containsKey(sessionId);
    }

    public HydraClient.SubjectInfo getSessionSubject(String sessionId) {
        return SESSION_STORAGE.get(sessionId);
    }

    public void saveSessionSubject(String sessionId, HydraClient.SubjectInfo subjectInfo) {
        SESSION_STORAGE.put(sessionId, subjectInfo);
    }

    public void deleteSessionSubject(String sessionId) {
        SESSION_STORAGE.remove(sessionId);
    }

    public boolean postLogoutUrlExists(String postLogoutUrlId) {
        return REGISTERED_POST_LOGOUT_URLS.containsKey(postLogoutUrlId);
    }

    public String registerPostLogoutRedirectUrl(String postLogoutUrl) {
        String postLogoutUrlId = DigestUtil.getSha256String(UUID.randomUUID().toString());
        REGISTERED_POST_LOGOUT_URLS.put(postLogoutUrlId, postLogoutUrl);
        return postLogoutUrlId;
    }

    public String getPostLogoutRedirectUrl(String postLogoutUrlId) {
        return REGISTERED_POST_LOGOUT_URLS.get(postLogoutUrlId);
    }

    public void removePostLogoutRedirectUrl(String postLogoutUrlId) {
        REGISTERED_POST_LOGOUT_URLS.remove(postLogoutUrlId);
    }

    public Cookie createPostLogoutRedirectCookie(String postLogoutRedirectUrl) {
        return createPostLogoutRedirectCookie(postLogoutRedirectUrl, 5 * 60);
    }

    public Cookie removePostLogoutRedirectCookie(String postLogoutRedirectUrl) {
        return createPostLogoutRedirectCookie(postLogoutRedirectUrl, 0);
    }

    private Cookie createPostLogoutRedirectCookie(String postLogoutRedirectUrl, int exp) {
        String redirectUrlId = registerPostLogoutRedirectUrl(postLogoutRedirectUrl);
        Cookie postLogoutCookie = new Cookie(OP_LOGOUT_REDIRECT_COOKIE_NAME, redirectUrlId);
        postLogoutCookie.setHttpOnly(true);
        postLogoutCookie.setSecure(true);
        postLogoutCookie.setMaxAge(exp);
        postLogoutCookie.setPath("/logout");
        return postLogoutCookie;
    }

}