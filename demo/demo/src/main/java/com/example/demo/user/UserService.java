package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //get all users
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public List<User> getUserById(String userId){
        boolean exists = userRepository.existsById(userId);

        if(!exists){
            throw new IllegalStateException("User with id " +userId+ " doesn't exist");
        }else{
            return userRepository.findAllById(Collections.singleton(userId));
        }
    }


}
