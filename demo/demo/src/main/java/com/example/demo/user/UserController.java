package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserDTO> getUser(@RequestParam String uuid) {
        UserDTO dto = userService.getUserByUUID(uuid);
        return ResponseEntity.ok(dto);
    }

    @PutMapping(path = "{uuid}")
    public void updateTrio(
            @PathVariable("uuid") String uuid,
            @RequestParam(required = false) String player1,
            @RequestParam(required = false) String player2,
            @RequestParam(required = false) String player3
    ){
        userService.updateTrio(uuid, player1, player2, player3);
    }
    

}
