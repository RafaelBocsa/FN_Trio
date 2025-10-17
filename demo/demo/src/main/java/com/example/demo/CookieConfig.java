package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.server.CookieSameSiteSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CookieConfig {
    @Value("${spring.profiles.active:local}")
    private String activeProfile;

    @Bean
    public CookieSameSiteSupplier cookieSameSiteSupplier() {
        if ("prod".equalsIgnoreCase(activeProfile)) {
            return CookieSameSiteSupplier.ofNone();
        }
        return CookieSameSiteSupplier.ofLax();
    }
}