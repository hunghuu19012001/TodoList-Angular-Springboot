package com.example.todolist.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class GlobalCorsConfiguration implements WebMvcConfigurer {
    @Autowired
    @Qualifier("corsConfiguration")
    private CorsConfiguration corsConfiguration;
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new GlobalCorsConfiguration();
    }
    public class CorsConfig {
        @Bean
        public CorsConfiguration corsConfiguration() {
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("http://localhost:4200");
            corsConfiguration.addAllowedHeader("*");
            corsConfiguration.addAllowedMethod("*");
            corsConfiguration.addExposedHeader("Authorization");
            corsConfiguration.setAllowCredentials(true);
            return corsConfiguration;
        }
    }
}
