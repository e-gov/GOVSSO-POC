package ee.ria.tara.sso.client;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import ee.ria.tara.sso.LogUtil;
import ee.ria.tara.sso.config.ApplicationConfiguration;
import ee.ria.tara.sso.config.TaraClientConfiguration;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class TaraClient {

    private static final String AUTHORIZATION_CODE = "authorization_code";
    private static final Logger LOG = LoggerFactory.getLogger(TaraClient.class);

    @Autowired(required = true)
    @Qualifier("taraRestTemplate")
    RestTemplate taraRestTemplate;
    @Autowired
    TaraClientConfiguration taraConfiguration;
    @Autowired
    ApplicationConfiguration applicationConfiguration;
    @Autowired
    ObjectMapper objectMapper;

    public TaraTokenResponse getTokenResponse(String code, String redirectUri) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", AUTHORIZATION_CODE);
        form.add("code", code);
        form.add("redirect_uri", redirectUri);
        HttpEntity tokenRequestEntity = new HttpEntity(form, getAuhtorizationHeaders());

        LOG.info("POST TARA token request: url='{}', body='{}'", taraConfiguration.getTokenEndpoint(), tokenRequestEntity.toString());
        TaraTokenResponse tokenResponse = taraRestTemplate.exchange(taraConfiguration.getTokenEndpoint(), HttpMethod.POST, tokenRequestEntity, TaraTokenResponse.class).getBody();
        LOG.info("TARA returned token_response='{}'", LogUtil.asJsonString(tokenResponse));
        if (tokenResponse.isError()) {
            throw new RuntimeException("TARA token request failed with error: '" + tokenResponse.getError() + "'.");
        }
        return tokenResponse;
    }

    private HttpHeaders getAuhtorizationHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth(taraConfiguration.getClientId(), taraConfiguration.getClientSecret());
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return httpHeaders;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TaraTokenResponse {

        @JsonProperty("error")
        private String error;
        @JsonProperty("access_token")
        private String accessToken;
        @JsonProperty("token_type")
        private String tokenType;
        @JsonProperty("expires_in")
        private String expiresIn;
        @JsonProperty("id_token")
        private String idToken;
        @JsonProperty("refresh_token")
        private String refreshToken;

        boolean isError() {
            return error != null && !error.isBlank();
        }
    }

}
