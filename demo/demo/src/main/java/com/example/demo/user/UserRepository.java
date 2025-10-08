package com.example.demo.user;// data access layer

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String>{

    //JPA rep contains methods like find by id, name, find all etc.

    Boolean existsByProviderId(String providerId);

    User findByProviderId(String providerId);


}