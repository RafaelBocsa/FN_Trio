package com.example.demo.gemini;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl ;

    @Value("${gemini.api.key}")
    private String geminiApiKey ;

    private final WebClient webClient;
    private final UserRepository userRepository;

    @Autowired
    public GeminiService(WebClient.Builder webClient, UserRepository userRepository){
        this.webClient = webClient.build();
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
        }

        user.setRequests(req - 1);
        userRepository.save(user);
    }

    private String callGemini(String question) {
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", question)
                        })
                }
        );

        return webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
