package com.example.demo.user;

import java.util.UUID;

public class UserDTO {
    private String uuid;
    private String username;
    private String name;
    private String player1;
    private String player2;
    private String player3;
    private Integer requests;

    public UserDTO(User user){
        this.uuid = user.getUserUUID();
        this.name = user.getName();
        this.username = user.getUserName();
        this.player1 = user.getPlayer1();
        this.player2 = user.getPlayer2();
        this.player3 = user.getPlayer3();
        this.requests = user.getRequests();
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer3() {
        return player3;
    }

    public void setPlayer3(String player3) {
        this.player3 = player3;
    }

    public Integer getRequests(){return requests;}

    public void setRequests(Integer requests){this.requests = requests;}
}
