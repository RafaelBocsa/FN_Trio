package com.example.demo;

import com.example.demo.userInfo.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService; // Ensure this is injected

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
        //all security related configurations
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)
                        )
                        .successHandler((request, response, authentication) -> {
                                    response.sendRedirect("http://localhost:5173/dashboard");
                                })
                )
//                        .defaultSuccessUrl("http://localhost:5173/dashboard", true))
                .logout().logoutUrl("/logout").logoutSuccessUrl("http://localhost:5173/");
        ;

        // change success url to 8080/api/v1/users/create to create new user(post req) in db using 8080/user-info stuff
        // then direct to 5173/dashboard to see site
        return http.build();
    }


}
//To do

//User Table
//name varchar PK (user.name in front end)
//username varchar (default to user.name but changeable varchar through front end(put request))
//pfp varchar (default to user.profile || user.avatar_url)
//p1 varchar (store name of first player, default to null string)
//p2 varchar (store name of second player)
//p3 varchar (store name of third player)

//add/remove players to users table
//already have getPlayerByName






