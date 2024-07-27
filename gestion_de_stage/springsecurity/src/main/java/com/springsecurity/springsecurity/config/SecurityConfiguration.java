package com.springsecurity.springsecurity.config;

import com.springsecurity.springsecurity.Enumiration.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import static com.springsecurity.springsecurity.Enumiration.Role.ETUDIANT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class SecurityConfiguration {
    private final JwtAuthentificationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request.requestMatchers("/api/v1/auth/**")
                        .permitAll()
                        .requestMatchers("api/v1/democontroller").hasAnyAuthority(Role.ETUDIANT.name())
                        .requestMatchers("/api/v1/democtr").hasAnyAuthority(Role.ENCADRANT.name())

                        .requestMatchers("/api/v1/registerChefFiliere").hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers("/api/v1/registerEncadrant").hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers("/api/v1/registerEntreprise").hasAnyAuthority(Role.ADMIN.name())

                        .requestMatchers("/api/v1/registerEtudiant").hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers("/api/v1/afficherEtudiants").hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers("/api/v1/afficherEtudiant/{id_etudiant}").hasAnyAuthority(Role.ADMIN.name(), Role.ETUDIANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/modifyEtudiant/{id_etudiant}").hasAnyAuthority(Role.ADMIN.name(), Role.ETUDIANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/deleteEtudiant/{id_etudiant}").hasAnyAuthority(Role.ADMIN.name(), Role.ETUDIANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/afficherEncadrants").hasAnyAuthority(Role.ADMIN.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/supprimer/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.CHEF_FILIERE.name())

                        .requestMatchers("/api/v1/afficherEncadrant/{id_Encadrant}").hasAnyAuthority(Role.ADMIN.name(), Role.ETUDIANT.name(), Role.CHEF_FILIERE.name(), Role.ENCADRANT.name())
                        .requestMatchers("/api/v1/updateEncadrant/{id_encadrant}").hasAnyAuthority(Role.ADMIN.name(), Role.ENCADRANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/afficherChefFilieres").hasAnyAuthority(Role.ADMIN.name(), Role.ETUDIANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/afficherChefFiliere/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.ENCADRANT.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/updateChefFiliere/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.CHEF_FILIERE.name())
                        .requestMatchers("/api/v1/deleteChefFiliere/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.CHEF_FILIERE.name())

                        .requestMatchers("/api/v1/afficherEntreprise").hasAnyAuthority(Role.ADMIN.name(), Role.ENCADRANT.name(), Role.CHEF_FILIERE.name(), Role.ETUDIANT.name(), Role.ENTREPRISE.name())
                        .requestMatchers("/api/v1/afficherEntreprise/{id_entreprise}").hasAnyAuthority(Role.ADMIN.name(), Role.ENCADRANT.name(), Role.CHEF_FILIERE.name(), Role.ETUDIANT.name(), Role.ENTREPRISE.name())
                        .requestMatchers("/api/v1/editEntreprise/{id_entreprise}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name())
                        .requestMatchers("/api/v1/delete/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name())

                        .requestMatchers("/api/posts/register").hasAnyAuthority(Role.ENTREPRISE.name())
                        .requestMatchers("/api/posts/all/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name(), Role.ETUDIANT.name())
                        .requestMatchers("/api/posts/getPostById/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name(), Role.ETUDIANT.name())
                        .requestMatchers("/api/posts/filiere/{filiere}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name(), Role.ETUDIANT.name())
                        .requestMatchers("/api/posts/titre/{titre}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name(), Role.ETUDIANT.name())
                        .requestMatchers("/api/posts/delete/{id}").hasAnyAuthority(Role.ADMIN.name(), Role.ENTREPRISE.name())
                        .requestMatchers("/api/posts/updtade/{id}").hasAnyAuthority(Role.ENTREPRISE.name())
                        .requestMatchers("/api/posts/closed/{id}").hasAnyAuthority(Role.ENTREPRISE.name())

                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
