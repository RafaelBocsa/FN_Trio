// service layer (business logic)
package com.example.demo.user;

import com.example.demo.player.Player;
import com.example.demo.player.PlayerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

    @Transactional
    public void updateTrio(String userId, String player1, String player2, String player3){
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("user with id" + userId+ " doesn't exist"));

        if(player1 != null){
            user.setPlayer1("null".equals(player1) ? null : player1);
        }
        if(player2 != null ){
            user.setPlayer2("null".equals(player2) ? null : player2);
        }
        if(player3 != null ){
            user.setPlayer3("null".equals(player3) ? null : player3);
        }

        //add only if a player isn't already on a users roster
        // && user.getPlayer1() != user.getPlayer2() && user.getPlayer1() != user.getPlayer3()
    }

    public void deleteUser(String userId) {
        boolean exists = userRepository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("User with id " +userId+ " doesn't exist");
        }
        userRepository.deleteById(userId);
    }


}
