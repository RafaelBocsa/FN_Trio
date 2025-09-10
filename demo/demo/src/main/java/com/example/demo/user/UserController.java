package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping // rest endpoint, get request aka get something from our server
    public List<User> getUsers(
            //getting user by id, if not then simply getting all users in db
            @RequestParam(required = false) String userId
    ){
        if(userId != null){
            return userService.getUserById(userId);
        }else{
            return userService.getUsers();
        }

    }

    @PutMapping(path = "{userId}")
    public void updateTrio(
            @PathVariable("userId") String userId,
            @RequestParam(required = false) String player1,
            @RequestParam(required = false) String player2,
            @RequestParam(required = false) String player3
    ){
        userService.updateTrio(userId, player1, player2, player3);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") String userId){
        userService.deleteUser(userId);
    }

}
