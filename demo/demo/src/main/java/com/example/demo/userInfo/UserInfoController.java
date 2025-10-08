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
        Map<String, Object> filtered = new HashMap<>();

        String providerId;
        if(principal.getAttribute("sub") != null){
             providerId = principal.getAttribute("sub");
        }else{
            int id = principal.getAttribute("id");
             providerId = Integer.toString(id);
        }

        User user = userRepository.findByProviderId(providerId);

        if (attributes.containsKey("avatar_url")) {
            filtered.put("username", user.getUserName());
            filtered.put("name", attributes.get("name"));
            filtered.put("email", attributes.get("email"));
            filtered.put("picture", attributes.get("avatar_url"));
            filtered.put("uuid", user.getUserUUID());
            filtered.put("requests", user.getRequests());
        }
        if (attributes.containsKey("sub")) {
            filtered.put("username", user.getUserName());
            filtered.put("name", attributes.get("name"));
            filtered.put("email", attributes.get("email"));
            filtered.put("picture", attributes.get("picture"));
            filtered.put("uuid", user.getUserUUID());
            filtered.put("requests", user.getRequests());
        }

        return filtered;
    }


}
