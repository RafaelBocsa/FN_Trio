import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./Dashboard";
import { Button } from "@headlessui/react";

const TrioView = () => {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [playerData, setPlayerData] = useState([null, null, null]); // one slot per player
  const [totalPr, setTotalPr] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user?userId=" + userInfo.id,
        { withCredentials: true }
      );
      setUser(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error("ERROR ", error);
    }
  };

  const getPlayerData = async (playerName) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/player?name=" + playerName,
        { withCredentials: true }
      );
      console.log("getPlayerData: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching player:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadPlayers = async () => {
      const names = [user.player1, user.player2, user.player3];
      const promises = names.map((name) =>
        name ? getPlayerData(name) : Promise.resolve(null)
      );
      const results = await Promise.all(promises);
      setPlayerData(results); // array [p1, p2, p3]
      console.log("setPlayerData: ", results);

      let totalPr = 0;
      let totalEarnings = 0;
      for (let i = 0; i < 3; i++) {
        if (results[i]) {
          totalPr += results[i][0].pr_points;
          totalEarnings += results[i][0].earnings;
        }
      }
      setTotalPr(totalPr);
      setTotalEarnings(totalEarnings);
      console.log("PR: " + totalPr);
      console.log("Earnings: " + totalEarnings);
    };

    loadPlayers();
  }, [user]);

  const remove = async (index) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/user/${
          userInfo.id
        }?player${index}=${null}`,
        {},
        { withCredentials: true }
      );
      getUserData();
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">My Trio</div>
      <div className="p-6">
        <div className="flex gap-6 flex-col lg:flex-row">
          {playerData.map((player, index) => (
            <div
              key={index}
              className="border rounded  w-[20rem] h-[30rem] text-center"
            >
              {player ? (
                <div>
                  <div className="flex justify-center p-6 items-center">
                    <img
                      src={playerData[index][0].profileImageUrl || "/icon.png"}
                      alt="Country Flag"
                      className="w-38 h-38 object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <img
                      src={playerData[index][0].countryImageUrl || "/globe.png"}
                      alt="Country Flag"
                      className="h-12 w-12 "
                    />
                    <p className="text-2xl ">
                      {playerData[index][0].player_name}
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-4 gap-1 text-lg">
                    <p>
                      PR Points:{" "}
                      {playerData[index][0].pr_points.toLocaleString("en-US")}
                    </p>
                    <p>
                      Earnings:{" "}
                      {playerData[index][0].earnings.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="flex justify-end p-4 ">
                    <Button
                      className="hover:text-red-500 w-8 h-8 bg-[url(/public/trash.svg)] bg-contain bg-no-repeat bg-center"
                      onClick={() => remove(index + 1)}
                    ></Button>
                  </div>
                </div>
              ) : (
                <Link to={`/dashboard/players?slot=${index + 1}`}>
                  <div className="relative h-full group ">
                    <div className="absolute inset-0 bg-[url(/llama.jpeg)] border text-white rounded items-center justify-center bg-no-repeat bg-cover opacity-50 lg:opacity-0 group-hover:opacity-50 transition-opacity duration-400 "></div>
                    <div className="flex relative z-10 h-full items-center justify-center text-white">
                      Add Player
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center p-10 text-xl">
          <div>Total PR Points: {totalPr.toLocaleString("en-US")}</div>
          <div> Total Earnings: {totalEarnings.toLocaleString("en-US")}</div>
        </div>
      </div>
    </div>
  );
};

export default TrioView;
