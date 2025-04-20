// api layer
package com.example.demo.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController //makes this class to serve REST end points
@RequestMapping(path = "api/v1/player")//local 8080/api/v1/player
public class PlayerController {
    //resources for api

    private final PlayerService playerService;
    @Autowired //says PlayerService should be magically instantiated for us then injected into this constructor
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }


    @GetMapping // rest endpoint, get request aka get something from our server
    public List<Player> getPlayers(
            //getting players by name, if not then simply getting all players in db
            @RequestParam(required = false) String name
    ){
        if(name != null){
            return playerService.getPlayerByName(name);
        }else{
            return playerService.getPlayers();
        }

    }

//    @PostMapping
//    public void registerNewPlayer(@RequestBody Player player){//take player from CLIENT, map to this player
//        playerService.addNewPlayer(player);
//    }

//    @DeleteMapping(path = "{playerId}")
//    public void deletePlayer(@PathVariable("playerId") Long playerId){
//        //can enforce id is not null
//        playerService.deletePlayer(playerId);
//    }

    //updating player name based on playerId
//    @PutMapping(path = "{playerId}")
//    public void updatePlayer(
//            @PathVariable("playerId") Long playerId,
//            @RequestParam(required = false) String name
//    ){
//        playerService.updatePlayer(playerId, name);
//    }

}
