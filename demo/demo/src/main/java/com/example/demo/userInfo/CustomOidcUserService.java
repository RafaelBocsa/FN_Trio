package com.example.demo.userInfo;


import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomOidcUserService extends OidcUserService {

    @Autowired
    private UserRepository userRepository;

    public CustomOidcUserService(){
        System.out.println("OIDC service initialized!");
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        System.out.println(provider);

        String providerId = oidcUser.getAttribute("sub");  // unique Google ID
        String username = oidcUser.getAttribute("given_name");
        String name = oidcUser.getAttribute("name");
        UUID uuid = UUID.randomUUID();
        Integer requests = 5;

        System.out.println("User ID: " + providerId);
        System.out.println("Username: " + username);

        if (!userRepository.existsByProviderId(providerId)) {
            User newUser = new User(uuid.toString(), providerId, username, name, null, null, null, requests);
            userRepository.save(newUser);
            System.out.println("Saved new Google user: " + newUser);
        } else {
            User user = userRepository.findByProviderId(providerId);
            user.setName(name);
            user.setUserName(username);
            userRepository.save(user);
            System.out.println("Google user already exists: " + uuid);
        }

        return oidcUser;
    }

}