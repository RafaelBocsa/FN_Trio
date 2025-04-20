import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/player", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []);

  const test = () => {
    console.log("test");
  };

  return (
    <div className="">
      <div className=" grid grid-cols-5 grid-rows-1 border-b-2  w-[70vw]  md:w-150 lg:w-200  text-sm md:text-lg ">
        <p>Player Name</p>
        <p>Country</p>
        <p>PR Points</p>
        <p>Earnings: $</p>
        <p></p>
      </div>
      {players.map((player) => (
        <div
          key={player.player_name}
          className="grid grid-cols-5 grid-rows-1     border-b-2  w-[70vw] md:w-150 lg:w-200 text-sm md:text-lg items-center justify-center"
        >
          <h2>{player.player_name}</h2>
          <p>{player.country}</p>
          <p>{player.pr_points}</p>
          <p>{player.earnings}</p>
          <div className=" hover:bg-green-700 " onClick={test}>
            add
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
