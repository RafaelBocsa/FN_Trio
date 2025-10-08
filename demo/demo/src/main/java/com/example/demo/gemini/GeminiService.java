package com.example.demo.gemini;

import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
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
        User user = userRepository.findById(uuid).orElseThrow(() -> new IllegalStateException("User with id " + uuid+ " doesn't exist"));
        int req = user.getRequests();
        System.out.println(req);
        String response;
        if(req > 0){
            int newReq = req-1;
            user.setRequests(newReq);
            System.out.println(newReq);
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[]{
                            Map.of("parts", new Object[]{
                                    Map.of("text", question)
                            })
                    }
            );


            response = webClient.post()
                    .uri(geminiApiUrl  + geminiApiKey )
                    .header("Content-Type" , "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        }else{
            response = "Hit daily Gemini requests";
        }

        return response;
    }
}
