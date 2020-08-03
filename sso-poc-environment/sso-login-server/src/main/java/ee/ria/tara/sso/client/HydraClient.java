package ee.ria.tara.sso.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import ee.ria.tara.sso.config.HydraClientConfiguration;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.Map;

@Service
public class HydraClient {

    private static final Logger LOG = LoggerFactory.getLogger(HydraClient.class);
    private static final String PARAM_LOGIN_CHALLENGE = "login_challenge";
    private static final String PARAM_CONSENT_CHALLENGE = "consent_challenge";
    private static final String PARAM_LOGOUT_CHALLENGE = "logout_challenge";
    private static final String PARAM_SUBJECT = "subject";
    private static final String PARAM_CLIENT_ID = "client";

    @Autowired
    @Qualifier("hydraRestTemplate")
    RestTemplate hydraRestTemplate;
    @Autowired
    HydraClientConfiguration hydraClientConfiguration;

    public LoginRequest getLoginRequest(String loginChallenge) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/login")
                .queryParam(PARAM_LOGIN_CHALLENGE, loginChallenge);
        LOG.info("GET LoginRequest: url='{}'", urlBuilder.toUriString());
        ResponseEntity<LoginRequest> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.GET, RequestEntity.EMPTY, LoginRequest.class);
        LoginRequest responseBody = responseEntity.getBody();
        return responseBody;
    }

    public ConsentRequest getConsentRequest(String consentChallenge) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/consent")
                .queryParam(PARAM_CONSENT_CHALLENGE, consentChallenge);
        LOG.info("GET ConsentRequest: url='{}'", uriBuilder.toUriString());
        ResponseEntity<ConsentRequest> responseEntity = hydraRestTemplate.exchange(uriBuilder.toUriString(), HttpMethod.GET, RequestEntity.EMPTY, ConsentRequest.class);
        ConsentRequest responseBody = responseEntity.getBody();
        return responseBody;
    }

    public LogoutRequest getLogoutRequest(String logoutChallenge) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/logout")
                .queryParam(PARAM_LOGOUT_CHALLENGE, logoutChallenge);
        LOG.info("GET LogoutRequest: url='{}'", uriBuilder.toUriString());
        ResponseEntity<LogoutRequest> responseEntity = hydraRestTemplate.exchange(uriBuilder.toUriString(), HttpMethod.GET, RequestEntity.EMPTY, LogoutRequest.class);
        LogoutRequest responseBody = responseEntity.getBody();
        return responseBody;
    }

    public CompletedRequest acceptLoginRequest(String loginChallenge, HydraSessionContext sessionContext) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/login/accept")
                .queryParam(PARAM_LOGIN_CHALLENGE, loginChallenge);
        AcceptLoginRequest requestBody = new AcceptLoginRequest();
        requestBody.setSubject(sessionContext.getSubjectInfo().getSubject());
        requestBody.setRemember(true);
        requestBody.setAcr(sessionContext.getSubjectInfo().getAcr());
        requestBody.setContext(sessionContext);
        HttpEntity<AcceptLoginRequest> requestEntity = new HttpEntity(requestBody);
        LOG.info("PUT AcceptLoginRequest: url='{}', body='{}'", urlBuilder.toUriString(), requestEntity.toString());
        ResponseEntity<CompletedRequest> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.PUT, requestEntity, CompletedRequest.class);
        return responseEntity.getBody();
    }

    public CompletedRequest acceptConsentRequest(String consentChallenge, HydraSessionContext sessionContext, String[] requestedScopes) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/consent/accept")
                .queryParam(PARAM_CONSENT_CHALLENGE, consentChallenge);
        AcceptConsentRequest requestBody = new AcceptConsentRequest();
        requestBody.setRemember(true);
        requestBody.setGrantScope(requestedScopes);
        LoginSession loginSession = new LoginSession();

        loginSession.setIdToken(Map.of("profile_attributes", Map.of(
                "family_name", sessionContext.getSubjectInfo().getFamilyName(),
                "given_name", sessionContext.getSubjectInfo().getGivenName(),
                "date_of_birth", sessionContext.getSubjectInfo().getDateOfBirth()
                ),
                "amr", sessionContext.getSubjectInfo().getAmr()
        ));
        requestBody.setSession(loginSession);

        HttpEntity<AcceptConsentRequest> requestEntity = new HttpEntity(requestBody);
        LOG.info("PUT AcceptConentRequest: url='{}', body='{}'", uriBuilder.toUriString(), requestEntity.toString());
        ResponseEntity<CompletedRequest> responseEntity = hydraRestTemplate.exchange(uriBuilder.toUriString(), HttpMethod.PUT, requestEntity, CompletedRequest.class);
        return responseEntity.getBody();
    }

    public CompletedRequest acceptLogoutRequest(String logoutChallenge) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/requests/logout/accept")
                .queryParam(PARAM_LOGOUT_CHALLENGE, logoutChallenge);
        LOG.info("PUT AcceptLogoutRequest: url='{}'", uriBuilder.toUriString());
        ResponseEntity<CompletedRequest> responseEntity = hydraRestTemplate.exchange(uriBuilder.toUriString(), HttpMethod.PUT, RequestEntity.EMPTY, CompletedRequest.class);
        return responseEntity.getBody();
    }

    public CompletedRequest rejectLoginRequest(String loginChallenge, String error, String errorDescription) {
        return rejectRequest(loginChallenge, error, errorDescription, PARAM_LOGIN_CHALLENGE, "/oauth2/auth/requests/login/reject");
    }

    public CompletedRequest rejectConsentRequest(String consentChallenge, String error, String errorDescription) {
        return rejectRequest(consentChallenge, error, errorDescription, PARAM_CONSENT_CHALLENGE, "/oauth2/auth/requests/consent/reject");
    }

    public CompletedRequest rejectLogoutRequest(String logoutChallenge, String error, String errorDescription) {
        return rejectRequest(logoutChallenge, error, errorDescription, PARAM_LOGOUT_CHALLENGE, "/oauth2/auth/requests/logout/reject");
    }

    private CompletedRequest rejectRequest(String requestChallenge, String error, String errorDescription, String urlParameterName, String url) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + url)
                .queryParam(urlParameterName, requestChallenge);
        RejectRequest rejectRequest = new RejectRequest();
        rejectRequest.setError(error);
        rejectRequest.setErrorDescription(errorDescription);
        HttpEntity<RejectRequest> requestEntity = new HttpEntity<>(rejectRequest);
        LOG.info("PUT RejectRequest: url='{}', body='{}'", urlBuilder.toUriString(), requestEntity.toString());
        ResponseEntity<CompletedRequest> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.PUT, requestEntity, CompletedRequest.class);
        return responseEntity.getBody();
    }

    public OAuth2Client getClient(String audience) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/clients");
        LOG.info("GET Clients: url='{}'", urlBuilder.toUriString());
        ResponseEntity<OAuth2Client[]> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.GET, RequestEntity.EMPTY, OAuth2Client[].class);
        OAuth2Client[] responseBody = responseEntity.getBody();
        return Arrays.stream(responseBody).filter(client -> client.getAudience()[0].equals(audience)).findFirst().get();
    }

    /**
     * This endpoint revokes a subject's granted consent sessions for a specific OAuth 2.0 Client
     * and invalidates all associated OAuth 2.0 Access Tokens.
     *
     * @param clientId
     * @param subject
     * @see <a href="https://www.ory.sh/hydra/docs/reference/api/#revokes-consent-sessions-of-a-subject-for-a-specific-oauth-20-client">Hydra REST API</a>
     */
    public void revokeConsent(String clientId, String subject) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/sessions/consent")
                .queryParam(PARAM_SUBJECT, subject)
                .queryParam(PARAM_CLIENT_ID, clientId);
        LOG.info("DELETE RevokeConsent: url='{}'", urlBuilder.toUriString());
        ResponseEntity<String> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.DELETE, RequestEntity.EMPTY, String.class);
        return;
    }

    /**
     * This endpoint revokes a subject's granted consent sessions for all OAuth 2.0 Clients and
     * invalidates all associated OAuth 2.0 Access Tokens. Meaning that user is logged out of
     * all devices.
     * <p>
     * This method is not compatible with OIDC back-channel logout. Back-channel notifications
     * will not be sent for revoked consents.
     *
     * @param subject
     * @see <a href="https://www.ory.sh/hydra/docs/reference/api/#revokes-consent-sessions-of-a-subject-for-a-specific-oauth-20-client">Hydra REST API</a>
     */
    public void revokeConsents(String subject) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/sessions/consent")
                .queryParam(PARAM_SUBJECT, subject);
        ResponseEntity<String> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.DELETE, RequestEntity.EMPTY, String.class);
        return;
    }


    public PreviousConsentSession[] getAllUserConsentSessions(String subject) {
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromHttpUrl(hydraClientConfiguration.getAdminApiUrl() + "/oauth2/auth/sessions/consent")
                .queryParam(PARAM_SUBJECT, subject);
        LOG.info("GET Consents: url='{}'", urlBuilder.toUriString());
        ResponseEntity<PreviousConsentSession[]> responseEntity = hydraRestTemplate.exchange(urlBuilder.toUriString(), HttpMethod.GET, RequestEntity.EMPTY, PreviousConsentSession[].class);
        return responseEntity.getBody();
    }

    @Data
    public static class LoginRequest {
        @JsonProperty("challenge")
        private String challenge;
        @JsonProperty("client")
        private OAuth2Client client;
        @JsonProperty("oidc_context")
        private OpenIDConnectContext oidcContext;
        @JsonProperty("request_url")
        private String requestUrl;
        @JsonProperty("requested_access_token_audience")
        private String[] requestedAccessTokenAudience = null;
        @JsonProperty("requested_scope")
        private String[] requestedScope = null;
        @JsonProperty("session_id")
        private String sessionId;
        @JsonProperty("skip")
        private Boolean skip;
        @JsonProperty("subject")
        private String subject;

    }

    @Data
    public static class AcceptLoginRequest {
        @JsonProperty("acr")
        private String acr;
        @JsonProperty("subject")
        private String subject;
        @JsonProperty("remember")
        private boolean remember;
        @JsonProperty("remember_for")
        private int rememberForInSeconds;
        @JsonProperty("context")
        private HydraSessionContext context;
    }

    @Data
    public static class ConsentRequest {
        @JsonProperty("acr")
        private String acr;
        @JsonProperty("challenge")
        private String challenge;
        @JsonProperty("client")
        private OAuth2Client client;
        @JsonProperty("context")
        private HydraSessionContext context;
        @JsonProperty("login_challenge")
        private String loginChallenge;
        @JsonProperty("login_session_id")
        private String loginSessionId;
        @JsonProperty("oidc_context")
        private OpenIDConnectContext oidcContext;
        @JsonProperty("request_url")
        private String requestUrl;
        @JsonProperty("requested_access_token_audience")
        private String[] requestedAccessTokenAudience = null;
        @JsonProperty("requested_scope")
        private String[] requestedScope = null;
        @JsonProperty("skip")
        private Boolean skip;
        @JsonProperty("subject")
        private String subject;
    }

    @Data
    public static class AcceptConsentRequest {
        @JsonProperty("grant_access_token_audience")
        private String[] grantAccessTokenAudience;
        @JsonProperty("grant_scope")
        private String[] grantScope;
        @JsonProperty("handled_at")
        private String handledAt;
        @JsonProperty("remember")
        private boolean remember = false;
        @JsonProperty("remember_for")
        private int rememberFor = 3200;
        @JsonProperty("session")
        private LoginSession session;
    }

    @Data
    public static class LogoutRequest {
        @JsonProperty("request_url")
        private String requestUrl;
        @JsonProperty("rp_initiated")
        private Boolean rpInitiated;
        @JsonProperty("sid")
        private String sid;
        @JsonProperty("subject")
        private String subject;
    }

    @Data
    public static class RejectRequest {
        @JsonProperty("error")
        private String error;
        @JsonProperty("error_debug")
        private String debugError;
        @JsonProperty("error_description")
        private String errorDescription;
        @JsonProperty("error_hint")
        private String errorHint;
        @JsonProperty("status_code")
        private int statusCode;
    }

    @Data
    public static class CompletedRequest {
        @JsonProperty("redirect_to")
        private String redirectTo;
    }

    @Data
    public static class OidcContext {
        @JsonProperty("acr_values")
        private String[] acrValues;
    }

    @Data
    public static class LoginRequestClient {
        @JsonProperty("client_id")
        private String clientId;
        @NotBlank
        @JsonProperty("scope")
        private String allowedScope;
    }


    @Data
    public static class HydraSessionContext {
        @JsonProperty("new_authentication")
        private boolean newAuthentication;
        @JsonProperty("session_update_request")
        private boolean sessionUpdateRequest;
        @JsonProperty("login_rejected")
        private boolean loginRejected;
        @JsonProperty("subject_info")
        private SubjectInfo subjectInfo;
    }

    @Data
    public static class SubjectInfo {
        @JsonProperty("subject")
        private String subject;
        @JsonProperty("tara_id_token")
        private String taraIdToken;
        @JsonProperty("given_name")
        private String givenName;
        @JsonProperty("family_name")
        private String familyName;
        @JsonProperty("date_of_birth")
        private String dateOfBirth;
        @JsonProperty("email")
        private String email;
        @JsonProperty("acr")
        private String acr;
        @JsonProperty("amr")
        private String amr;
    }

    @Data
    public static class OpenIDConnectContext {
        @JsonProperty("acr_values")
        private String[] acrValues = null;
        @JsonProperty("display")
        private String display;
        @JsonProperty("id_token_hint_claims")
        private Object idTokenHintClaims;
        @JsonProperty("login_hint")
        private String loginHint;
        @JsonProperty("ui_locales")
        private String[] uiLocales = null;
    }

    @Data
    public static class OAuth2Client {
        @JsonProperty("allowed_cors_origins")
        private String[] allowedCorsOrigins = null;
        @JsonProperty("audience")
        private String[] audience = null;
        @JsonProperty("backchannel_logout_session_required")
        private Boolean backchannelLogoutSessionRequired;
        @JsonProperty("backchannel_logout_uri")
        private String backchannelLogoutUri;
        @JsonProperty("client_id")
        private String clientId;
        @JsonProperty("client_name")
        private String clientName;
        @JsonProperty("client_secret")
        private String clientSecret;
        @JsonProperty("client_secret_expires_at")
        private Long clientSecretExpiresAt;
        @JsonProperty("client_uri")
        private String clientUri;
        @JsonProperty("contacts")
        private String[] contacts = null;
        @JsonProperty("created_at")
        private OffsetDateTime createdAt;
        @JsonProperty("frontchannel_logout_session_required")
        private Boolean frontchannelLogoutSessionRequired;
        @JsonProperty("frontchannel_logout_uri")
        private String frontchannelLogoutUri;
        @JsonProperty("grant_types")
        private String[] grantTypes = null;
        @JsonProperty("jwks")
        private Object jwks;
        @JsonProperty("jwks_uri")
        private String jwksUri;
        @JsonProperty("logo_uri")
        private String logoUri;
        @JsonProperty("metadata")
        private Object metadata;
        @JsonProperty("owner")
        private String owner;
        @JsonProperty("policy_uri")
        private String policyUri;
        @JsonProperty("post_logout_redirect_uris")
        private String[] postLogoutRedirectUris = null;
        @JsonProperty("redirect_uris")
        private String[] redirectUris = null;
        @JsonProperty("request_object_signing_alg")
        private String requestObjectSigningAlg;
        @JsonProperty("request_uris")
        private String[] requestUris = null;
        @JsonProperty("response_types")
        private String[] responseTypes = null;
        @JsonProperty("scope")
        private String scope;
        @JsonProperty("sector_identifier_uri")
        private String sectorIdentifierUri;
        @JsonProperty("subject_type")
        private String subjectType;
        @JsonProperty("token_endpoint_auth_method")
        private String tokenEndpointAuthMethod;
        @JsonProperty("tos_uri")
        private String tosUri;
        @JsonProperty("updated_at")
        private OffsetDateTime updatedAt;
        @JsonProperty("userinfo_signed_response_alg")
        private String userinfoSignedResponseAlg;
    }

    @Data
    public static class LoginSession {
        @JsonProperty("id_token")
        private Map idToken;
        @JsonProperty("access_token")
        private Map accessToken;
    }

    @Data
    public static class PreviousConsentSession {
        @JsonProperty("consent_request")
        private ConsentRequest consentRequest;
    }

}
