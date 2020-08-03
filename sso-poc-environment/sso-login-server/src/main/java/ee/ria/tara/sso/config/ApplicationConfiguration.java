package ee.ria.tara.sso.config;

import lombok.Getter;
import lombok.Setter;
import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
@ConfigurationProperties(prefix = "sso.application")
public class ApplicationConfiguration implements WebMvcConfigurer {

    @Getter
    @Setter
    String publicUrl;

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        Locale eeLocale = new Locale("ET", "EE");
        slr.setDefaultLocale(eeLocale);
        return slr;
    }

    @Bean
    public LayoutDialect layoutDialect() {
        return new LayoutDialect();
    }


}
