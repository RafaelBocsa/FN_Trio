import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@headlessui/react";
import { UserContext } from "./Dashboard";

const PlayerList = () => {
  const { userInfo } = useContext(UserContext);
  const [players, setPlayers] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slot = searchParams.get("slot"); // which slot is being filled

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

  const add = (playerName) => {
    axios
      .put(
        "http://localhost:8080/api/v1/user/" +
          userInfo.id +
          "?" +
          "player" +
          slot +
          "=" +
          playerName,
        {},
        { withCredentials: true }
      )
      .then(() => navigate("/dashboard/trio"))
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="p-10">Select a Player</h1>
      <div className=" grid grid-cols-5 grid-rows-1 py-6 border-b-2  w-[70vw]  md:w-150 lg:w-200  text-sm md:text-lg ">
        <p>Player Name</p>
        <p>Country</p>
        <p>PR Points</p>
        <p>Earnings: $</p>
        <p></p>
      </div>
      {players.map((player) => (
        <div
          key={player.player_name}
          className="grid grid-cols-5 grid-rows-1 border-b-2 w-[70vw] md:w-150 lg:w-200 text-sm md:text-lg items-center justify-center"
        >
          <h2>{player.player_name}</h2>
          <p>{player.country}</p>
          <p>{player.pr_points.toLocaleString("en-US")}</p>
          <p>{player.earnings.toLocaleString("en-US")}</p>
          <Button
            className=" hover:bg-violet-600 "
            onClick={() => add(player.player_name)}
          >
            add
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
