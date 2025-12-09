package com.example.demo.userInfo;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserInfoController {
    private final UserRepository userRepository;

    public UserInfoController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user-info")
    public Map<String, Object> user(
            @AuthenticationPrincipal OAuth2User principal){
        Map<String, Object> attributes = principal.getAttributes();
        Map<String, Object> response = new HashMap<>();

        String providerId = attributes.containsKey("sub")
                ? attributes.get("sub").toString()
                : attributes.get("id").toString();

        User user = userRepository.findByProviderId(providerId);

        String pfp = attributes.containsKey("avatar_url")
                ? attributes.get("avatar_url").toString()
                : attributes.get("picture").toString();

        response.put("username", user.getUserName());
        response.put("name", attributes.get("name"));
        response.put("email", attributes.get("email"));
        response.put("picture", pfp);
        response.put("uuid", user.getUserUUID());
        response.put("requests", user.getRequests());

        return response;
    }


}
