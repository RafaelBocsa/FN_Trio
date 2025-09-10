// service layer (business logic)
package com.example.demo.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired //says PlayerRepository should be magically instantiated for us then injected into this constructor
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    //get all players
    public List<Player> getPlayers(){
        return playerRepository.findAll();
    }

    //get player by name
    public List<Player> getPlayerByName(String name){
        return  playerRepository.findAll().stream().filter(player -> player.getPlayer_name().toLowerCase().equals(name.toLowerCase())).collect(Collectors.toList());
    }

    //can do more validations here(check if email is valid or not)
    public void addNewPlayer(Player player) {
        Optional<Player> playerOptional =  playerRepository.findPlayerByName(player.getPlayer_name());
        if(playerOptional.isPresent()){
            throw new IllegalStateException("name taken");//error message for internal server error
        }
        playerRepository.save(player);
    }

    //delete player by player id
//    public void deletePlayer(Long playerId) {
//        boolean exists = playerRepository.existsById(playerId);
//
//        if(!exists){
//            throw new IllegalStateException("Player with id " +playerId+ " doesn't exist");
//        }
//        playerRepository.deleteById(playerId);
//    }

//    @Transactional
//    public void updatePlayer(Long playerId, String name){
//        //check if playerId exist
//        Player player = playerRepository.findById(playerId)
//                .orElseThrow(() -> new IllegalStateException("player with id " + playerId+ " doesn't exist"));
//
//        if(name != null && name.length() > 0 && !Objects.equals(name , player.getName())){
//            player.setName(name);
//        }
//    }

}
