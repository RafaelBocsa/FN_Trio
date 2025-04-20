package com.example.demo.user;// data access layer

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, String>{
    //JPA rep contains methods like find by id, name, find all etc.

}