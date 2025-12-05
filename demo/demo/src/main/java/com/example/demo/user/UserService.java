// service layer (business logic)
package com.example.demo.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public ResponseEntity<UserDTO> getUserByUUID(String uuid){
        boolean exists = userRepository.existsById(uuid);

        if(!exists){
            throw new IllegalStateException("User with id " +uuid+ " doesn't exist");
        }else{
            return userRepository.findById(uuid)
                    .map(user -> ResponseEntity.ok(new UserDTO(user)))
                    .orElse(ResponseEntity.notFound().build());
        }

    }

    @Transactional
    public void updateTrio(String uuid, String player1, String player2, String player3){
        User user = userRepository.findById(uuid).orElseThrow(() -> new IllegalStateException("User with id " + uuid+ " doesn't exist"));

        if(player1 != null && !player1.equals(user.getPlayer2()) && !player1.equals(user.getPlayer3())){
            user.setPlayer1("null".equals(player1) ? null : player1);
        }
        if(player2 != null && !player2.equals(user.getPlayer1()) && !player2.equals(user.getPlayer3())){
            user.setPlayer2("null".equals(player2) ? null : player2);
        }
        if(player3 != null && !player3.equals(user.getPlayer1()) && !player3.equals(user.getPlayer2())){
            user.setPlayer3("null".equals(player3) ? null : player3);
        }

        userRepository.save(user);

        //add only if a player isn't already on a users roster
        // && user.getPlayer1() != user.getPlayer2() && user.getPlayer1() != user.getPlayer3()
    }


}
