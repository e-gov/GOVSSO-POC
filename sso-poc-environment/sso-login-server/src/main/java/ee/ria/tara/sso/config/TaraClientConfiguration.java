package ee.ria.tara.sso.config;

import lombok.Data;
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Configuration
@ConfigurationProperties(prefix = "sso.tara")
@Valid
public class TaraClientConfiguration {

    @NotNull
    String clientId;
    @NotNull
    String clientSecret;
    @NotNull
    String tokenEndpoint;
    @NotNull
    String authorizationEndpoint;
    String userinfoEndpoint;
    String jwksUri;

    @NotNull
    private Resource trustStore;
    @NotNull
    private char[] trustStorePassword;

    @Bean(name = "taraRestTemplate")
    RestTemplate taraRestTemplate() throws Exception {
        SSLContext sslContext = new SSLContextBuilder()
                .loadTrustMaterial(trustStore.getURL(), trustStorePassword)
                .build();
        SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext);
        HttpClient httpClient = HttpClients.custom().setSSLSocketFactory(socketFactory).build();
        HttpComponentsClientHttpRequestFactory factory =
                new HttpComponentsClientHttpRequestFactory(httpClient);
        RestTemplate taraRestTemplate = new RestTemplate(factory);
        taraRestTemplate.getMessageConverters().add(new FormHttpMessageConverter());
        return taraRestTemplate;
    }

}