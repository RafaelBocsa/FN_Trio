package com.example.demo.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

//map player class to table in database
//creates table in db
@Entity //for hibernate
@Table(name = "player_data")
@JsonPropertyOrder({"player_name", "country", "pr_points", "earnings"}) // defines order of fields in JSON request
public class Player {
    @Id
    @Column(name = "player_name", unique = true)
    private String name;
    private String country;
    private Integer pr_points;
    private Integer earnings;


    public Player(){
    }

    public Player(String player_name, String country, Integer pr_points, Integer earnings) {
        this.name = player_name;
        this.country = country;
        this.pr_points = pr_points;
        this.earnings = earnings;
    }

    public String getPlayer_name() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public Integer getPr_points() {
        return pr_points;
    }

    public Integer getEarnings() {
        return earnings;
    }


    public void setPlayer_name(String player_name) {
        this.name = player_name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPr_points(Integer pr_points) {
        this.pr_points = pr_points;
    }

    public void setEarnings(Integer earnings) {
        this.earnings = earnings;
    }

    //     Run time polymorphism(dynamic polymorphism)
    @Override
    public String toString() {
        return "Player{" +
                "name =" + name + " TEST " +
                ", country ='" + country + '\'' +
                ", pr_points =" + pr_points +
                ", earnings ='" + earnings + '\'' +
                '}';
    }
}

