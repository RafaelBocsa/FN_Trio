package com.example.demo.gemini;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/v1/gemini")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/{uuid}/ask")
    public ResponseEntity<String> askGemini(@PathVariable("uuid") String uuid, @RequestBody Map<String , String > payload){
        String question = payload.get("question");
        String answer = geminiService.askGemini(uuid, question);
        return ResponseEntity.ok(answer);
    }
}
