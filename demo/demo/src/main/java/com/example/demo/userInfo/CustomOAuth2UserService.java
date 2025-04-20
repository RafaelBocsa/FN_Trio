package com.example.demo.userInfo;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    public CustomOAuth2UserService() {
        System.out.println("CustomOAuth2UserService initialized!");
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId(); // google or github
        Object rawUserId = null;
        System.out.println(provider);//
        if ("github".equals(provider)) {
            rawUserId = oauthUser.getAttribute("id"); // GitHub returns Integer
            System.out.println("GITHUB");
        }
        if( "google".equals(provider)) {
            System.out.println("GOOGLE");
            rawUserId = oauthUser.getAttribute("sub"); // Google returns String "sub"
        }
        String user_id = String.valueOf(rawUserId);
        String username = oauthUser.getAttribute("name");
        String name = oauthUser.getAttribute("name");
        String player1 = "null";
        String player2 = "null";
        String player3 = "null";

        System.out.println("User ID: " + user_id);
        System.out.println("Username: " + username);

        // save user if not already in db
        if (!userRepository.existsById(user_id)) {
            User newUser = new User(user_id, username, name, player1, player2, player3);
            userRepository.save(newUser);
            System.out.println("Saved new user: " + newUser);
        } else {
            System.out.println("User already exists: " + user_id);
        }

        return oauthUser;
    }

}