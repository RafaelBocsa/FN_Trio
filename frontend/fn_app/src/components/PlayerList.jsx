import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Button } from "@headlessui/react";
import { UserContext } from "./Dashboard";

const PlayerList = () => {
  const { userInfo } = useContext(UserContext);
  const [players, setPlayers] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const slot = searchParams.get("slot"); // which slot is being filled

  const getPlayers = async () => {
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/api/v1/player?uuid=` + userInfo.uuid
      );
      console.log(response.data);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
      return null;
    }
  };

  const add = async (playerName) => {
    try {
      await api.put(
        `${api.defaults.baseURL}/api/v1/user/${userInfo.uuid}?player${slot}=${playerName}`,
        {}
      );
      navigate("/dashboard/trio");
    } catch (error) {
      console.error("Error adding player:", error);
      return null;
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-10 md:p-10 justify-center flex items-center">
        Select a Player
      </h1>
      <div className=" grid grid-cols-4 gap-6 p-6 border-b-2  w-[80vw]  md:w-150 lg:w-200  text-sm md:text-lg place-items-center">
        <p>Player Name</p>
        <p>Country</p>
        <p>PR Points</p>
        <p>Earnings</p>
      </div>
      {players.map((player) => (
        <div
          key={player.player_name}
          className="relative grid grid-cols-4 gap-6 border-b-2 border-[#202022] h-[10vh] md:h-[7vh] w-[80vw] md:w-150 lg:w-200 text-sm md:text-lg place-items-center cursor-pointer"
          onClick={() => add(player.player_name)}
        >
          <div className="absolute inset-0 bg-[url(/llama.jpeg)] opacity-0 hover:opacity-50 bg-no-repeat bg-cover bg-bottom "></div>

          <h2 className="relative z-10">{player.player_name}</h2>
          <p className="relative z-10">{player.country}</p>
          <p className="relative z-10">
            {player.pr_points.toLocaleString("en-US")}
          </p>
          <p className="relative z-10">
            ${player.earnings.toLocaleString("en-US")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
