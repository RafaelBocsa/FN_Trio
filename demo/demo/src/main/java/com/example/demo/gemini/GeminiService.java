package com.example.demo.gemini;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
//import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.*;

import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl ;

    @Value("${gemini.api.key}")
    private String geminiApiKey ;

    private final RestTemplate restTemplate = new RestTemplate();
//    private final WebClient webClient;
    private final UserRepository userRepository;


    @Autowired
    public GeminiService( UserRepository userRepository){ //WebClient.Builder webClient
//        this.webClient = webClient.build();
        this.userRepository = userRepository;
    }


    public String askGemini(String uuid, String question) {
        decrementGeminiRequests(uuid);
        return callGemini(question);
    }

    @Transactional
    public void decrementGeminiRequests(String uuid) {
        User user = userRepository.findById(uuid)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        int req = user.getRequests();
        if (req <= 0) {
            throw new IllegalStateException("No remaining requests.");
        }else{
            user.setRequests(req - 1);
            userRepository.save(user);
        }

    }

    private String callGemini(String question) {
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", question)
                        })
                }
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                geminiApiUrl + geminiApiKey,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        return response.getBody();
    }
}
