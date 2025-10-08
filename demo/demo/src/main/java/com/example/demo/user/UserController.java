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

    @GetMapping // rest endpoint, get request aka get something from our server
    public ResponseEntity<UserDTO> getUser(
            //getting user by id, if not then simply getting all users in db
            @RequestParam(required = false) String uuid
    ){
        return userService.getUserByUUID(uuid);
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
