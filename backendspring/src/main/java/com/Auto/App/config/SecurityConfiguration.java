package com.Auto.App.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.Auto.App.config.auth.SecurityFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final SecurityFilter securityFilter;
    private final AuthenticationProvider authenticationProvider;
    public SecurityConfiguration(SecurityFilter securityFilter, AuthenticationProvider authenticationProvider) {
        this.securityFilter = securityFilter;
        this.authenticationProvider = authenticationProvider;
    }
    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/*")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
 


     


    
}
