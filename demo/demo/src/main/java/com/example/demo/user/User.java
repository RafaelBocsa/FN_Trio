package com.example.demo.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_data")
public class User {

    @Id
    @Column(name = "user_id", unique = true)
    private String user_id;
    private String username;
    private String name;
    private String player1;
    private String player2;
    private String player3;

    public User(){

    }

    public User(String user_id, String username, String name, String player1, String player2, String player3) {
        this.user_id = user_id;
        this.username = username;
        this.name = name;
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String userId) {
        this.user_id = userId;
    }

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

    //     Run time polymorphism(dynamic polymorphism)
    @Override
    public String toString() {
        return "User{" +
                "name =" + name +
                ", userName ='" + username + '\'' +
                ", player1 =" + player1 + '\'' +
                ", player2 ='" + player2 + '\'' +
                ", player3 ='" + player3 + '\'' +
                '}';
    }
}
