package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
