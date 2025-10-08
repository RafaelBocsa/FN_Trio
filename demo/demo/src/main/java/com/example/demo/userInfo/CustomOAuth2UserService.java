package com.example.demo.userInfo;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>  {

    @Autowired
    private UserRepository userRepository;

    public CustomOAuth2UserService() {
        System.out.println("CustomOAuth2UserService initialized!");
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = new DefaultOAuth2UserService().loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId(); // google or github
        Object rawUserId = null;
        System.out.println(provider);

        rawUserId = oauthUser.getAttribute("id"); // GitHub returns Integer
        String providerId = String.valueOf(rawUserId);
        String username = oauthUser.getAttribute("name");
        String name = oauthUser.getAttribute("name");
        UUID uuid = UUID.randomUUID();
        Integer requests = 5;

        System.out.println("User ID: " + providerId);
        System.out.println("Username: " + username);

        // save user if not already in db
        if (!userRepository.existsByProviderId(providerId)) {
            User newUser = new User(uuid.toString(), providerId, username, name, null, null, null,requests);
            userRepository.save(newUser);
            System.out.println("Saved new user: " + newUser);
        } else {
            User user = userRepository.findByProviderId(providerId);
            user.setName(name);
            user.setUserName(username);
            userRepository.save(user);
            System.out.println("User already exists: " + uuid);
        }

        return oauthUser;
    }

}