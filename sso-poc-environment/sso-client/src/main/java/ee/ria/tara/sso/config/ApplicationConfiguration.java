package ee.ria.tara.sso.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.thymeleaf.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "sso.application")
@ComponentScan(value = "ee.ria.tara.sso")
@EnableWebSecurity
public class ApplicationConfiguration extends WebSecurityConfigurerAdapter {

    @Getter
    @Setter
    String publicUrl;
    @Getter
    @Setter
    String faviconName = "faviconA.png";
    @Getter
    @Setter
    String acrValues;
    @Autowired
    ClientRegistrationRepository clientRegistrationRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().maximumSessions(1).sessionRegistry(sessionRegistry());

        http
                .authorizeRequests()
                .antMatchers("/", "/?error=*", "/images/*", "/error", "/session/logout").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().ignoringAntMatchers("/session/logout")
                .and()
                .cors()
                .and()
                .formLogin()
                .loginPage("/")
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/dashboard")
                .failureHandler(getAuthFailureHandler())
                .authorizationEndpoint().authorizationRequestResolver(new CustomAuthorizationRequestResolver(this.clientRegistrationRepository));
        http
                .logout(logout -> logout.logoutSuccessHandler(oidcLogoutSuccessHandler()))
                .logout()
                .deleteCookies().invalidateHttpSession(true)
                .and()
                .sessionManagement()
                //.invalidSessionUrl("/?error=invalid_session")
                .maximumSessions(1).expiredUrl("/?error=expired_session");
    }

    @Bean
    SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public SimpleUrlAuthenticationFailureHandler getAuthFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler() {

            private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
                    throws IOException, ServletException {
                redirectStrategy.sendRedirect(request, response, "/?error=authentication_failure");
            }
        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private LogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
                new OidcClientInitiatedLogoutSuccessHandler(clientRegistrationRepository);
        oidcLogoutSuccessHandler.setPostLogoutRedirectUri(URI.create(publicUrl));
        return oidcLogoutSuccessHandler;
    }

    public class CustomAuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {
        private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

        public CustomAuthorizationRequestResolver(
                ClientRegistrationRepository clientRegistrationRepository) {

            this.defaultAuthorizationRequestResolver =
                    new DefaultOAuth2AuthorizationRequestResolver(
                            clientRegistrationRepository, "/oauth2/authorization");
        }

        @Override
        public OAuth2AuthorizationRequest resolve(HttpServletRequest httpServletRequest) {
            OAuth2AuthorizationRequest authorizationRequest =
                    this.defaultAuthorizationRequestResolver.resolve(httpServletRequest);
            return authorizationRequest != null ? customAuthorizationRequest(authorizationRequest, httpServletRequest) : null;
        }

        @Override
        public OAuth2AuthorizationRequest resolve(
                HttpServletRequest httpServletRequest, String clientRegistrationId) {

            OAuth2AuthorizationRequest authorizationRequest =
                    this.defaultAuthorizationRequestResolver.resolve(httpServletRequest, clientRegistrationId);
            return authorizationRequest != null ? customAuthorizationRequest(authorizationRequest, httpServletRequest) : null;
        }

        private OAuth2AuthorizationRequest customAuthorizationRequest(
                OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest httpServletRequest) {

            Map<String, Object> additionalParameters = new LinkedHashMap<>(authorizationRequest.getAdditionalParameters());
            additionalParameters.put("acr_values", acrValues);

            if (isSSOUpdateRequest(httpServletRequest)) {
                checkSessionExpiration(httpServletRequest.getSession());
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
                additionalParameters.put("id_token_hint", getPreviousIDToken());
                additionalParameters.put("prompt", "none");
            } else {
                additionalParameters.put("prompt", "consent");
            }

            return OAuth2AuthorizationRequest.from(authorizationRequest)
                    .additionalParameters(additionalParameters)
                    .build();
        }

        private boolean isSSOUpdateRequest(HttpServletRequest httpServletRequest) {
            return StringUtils.equalsIgnoreCase(httpServletRequest.getParameter("prompt"), "none");
        }

        private String getPreviousIDToken() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication instanceof OAuth2AuthenticationToken)) {
                throw new RuntimeException("Invalid token update request. Previous authentication was not done through OIDC.");
            }
            OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
            OidcUser user = (OidcUser) authToken.getPrincipal();
            if (StringUtils.isEmpty(user.getIdToken().getTokenValue())) {
                throw new RuntimeException("Invalid token update request. Previous ID token not found in session.");
            }
            return user.getIdToken().getTokenValue();
        }

        private void checkSessionExpiration(HttpSession httpSession) {
            if (httpSession == null) {
                throw new SessionAuthenticationException("HttpSession not found or invalid session");
            }
            SessionInformation sessionInformation = sessionRegistry().getSessionInformation(httpSession.getId());
            if (sessionInformation == null || sessionInformation.isExpired()) {
                throw new SessionAuthenticationException("HttpSession has already expired. Can not continue with OIDC authentication.");
            }
        }

    }

}
