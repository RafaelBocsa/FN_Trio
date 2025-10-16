package com.example.demo.user;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "user_data")
@JsonPropertyOrder({"uuid","providerId","username","name","player1","player2","player3", "requests"})
public class User {

    @Id
    @Column(name = "uuid", unique = true)
    private String uuid;
    @Column(name = "provider_id", unique = true)
    private String providerId;
    private String username;
    private String name;
    private String player1;
    private String player2;
    private String player3;
    private Integer requests;

    public User(){

    }

    public User(String uuid, String providerId, String username, String name, String player1, String player2, String player3, Integer requests) {
        this.uuid = uuid;
        this.providerId = providerId;
        this.username = username;
        this.name = name;
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.requests = requests;
    }

    public String getUserUUID() {
        return uuid;
    }

    public void setUserUUID(String uuid) {
        this.uuid = uuid;
    }

    public String getProviderId() {
        return providerId; }

    public void setProviderId( String providerId) {
        this.providerId = providerId; }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getPlayer3() {
        return player3;
    }

    public void setPlayer3(String player3) {
        this.player3 = player3;
    }

    public Integer getRequests(){
        return requests;
    }

    public void setRequests(Integer requests){
        this.requests = requests;
    }

    //     Run time polymorphism(dynamic polymorphism)
    @Override
    public String toString() {
        return "User{" +
                "name =" + name +
                ", userName ='" + username + '\'' +
                ", player1 =" + player1 + '\'' +
                ", player2 ='" + player2 + '\'' +
                ", player3 ='" + player3 + '\'' +
                ", requests ='" + requests + '\'' +
                '}';
    }
}
