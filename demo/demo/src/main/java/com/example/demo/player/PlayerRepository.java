// data access layer
package com.example.demo.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// playerRepository inherits attributes from the JpaRepository class
//extends JpaRepository interface which provides CRUD operations for the player entity
@Repository
public interface PlayerRepository
        // JpaRepository interface contains methods like findAll, findAllById etc...
        extends JpaRepository<Player, String> {// Player is entity type and primary key is type String

    //    @Query("SELECT s FROM Player s WHERE s.name = ?1")// jpql not sql
    Optional<Player> findPlayerByName(String name);

//    @Query(SELECT s FROM Player s WHERE)
}
