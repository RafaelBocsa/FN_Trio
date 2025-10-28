import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { UserContext } from "./Dashboard";
import { Button } from "@headlessui/react";
import ReactMarkdown from "react-markdown";
import { fetchGeminiResponse } from "../api/gemini";

const TrioView = () => {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [playerData, setPlayerData] = useState([null, null, null]); // one slot per player
  const [totalPr, setTotalPr] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const responseRef = useRef(null);

  const getUserData = async () => {
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/api/v1/user?uuid=` + userInfo.uuid
      );
      setUser(response.data);
    } catch (error) {
      console.error("ERROR ", error);
      return null;
    }
  };

  const getPlayerData = async (playerName) => {
    try {
      const response = await api.get(
        `${api.defaults.baseURL}/api/v1/player?name=` + playerName
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching player:", error);
      return null;
    }
  };

  const remove = async (index) => {
    try {
      await api.put(
        `${api.defaults.baseURL}/api/v1/user/${
          userInfo.uuid
        }?player${index}=${null}`,
        {}
      );
      getUserData();
    } catch (error) {
      console.error("Error removing player:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (geminiResponse && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [geminiResponse]);

  useEffect(() => {
    if (!user) return;

    const loadPlayers = async () => {
      setLoadingPlayer(true);
      try {
        const names = [user.player1, user.player2, user.player3];
        const promises = names.map((name) =>
          name ? getPlayerData(name) : Promise.resolve(null)
        );
        const results = await Promise.all(promises);
        setPlayerData(results);

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
      } catch (error) {
        console.error("ERROR ", error);
      } finally {
        setLoadingPlayer(false);
      }
    };

    loadPlayers();
  }, [user]);

  const askGemini = async (p1, p2, p3) => {
    setLoadingGemini(true);
    setGeminiResponse(null);
    try {
      const prompt =
        "In a couple sentances each,search the web and tell me about the following 3 Pro Fortnite players based on their gamer tags. \n" +
        "-" +
        p1 +
        "\n" +
        "-" +
        p2 +
        "\n" +
        "-" +
        p3 +
        "\n" +
        "(It's not a problem if you can't find anything about a player)";

      if (user.requests > 0) {
        const response = await fetchGeminiResponse(prompt, userInfo.uuid);
        setGeminiResponse(response.candidates[0].content.parts[0].text);
        await getUserData();
      }
    } catch (error) {
      console.error("ERROR ", error);
    } finally {
      setLoadingGemini(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">My Trio</div>
      <div className="p-6">
        <div className="flex gap-6 flex-col lg:flex-row items-center">
          {playerData.map((player, index) => (
            <div
              key={index}
              className="border rounded  w-[20rem] h-[30rem] text-center"
            >
              {player && !loadingPlayer ? (
                <div className=" relative h-full w-full ">
                  <div className="absolute inset-0 bg-[url(/llama.jpeg)]  text-white  bg-no-repeat bg-cover opacity-50"></div>
                  <div className="relative z-10 h-full backdrop-blur-sm">
                    <div className="flex justify-center p-10 items-center ">
                      <img
                        src={
                          playerData[index][0].profileImageUrl || "/icon.png"
                        }
                        alt="Country Flag"
                        className="w-38 h-38 object-contain border"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2">
                      <img
                        src={
                          playerData[index][0].countryImageUrl || "/globe.png"
                        }
                        alt="Country Flag"
                        className="h-12 w-12 "
                      />
                      <p className="text-2xl ">
                        {playerData[index][0].player_name}
                      </p>
                    </div>

                    <div className="flex flex-col items-center p-4 gap-1 text-lga">
                      <p>
                        PR Points:{" "}
                        {playerData[index][0].pr_points.toLocaleString("en-US")}
                      </p>
                      <p>
                        Earnings:{" "}
                        {playerData[index][0].earnings.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="absolute right-0 bottom-0 justify-end p-4 ">
                      <Button
                        id="button1"
                        className="hover:text-red-500 w-8 h-8 bg-[url(/public/trash.svg)] bg-contain bg-no-repeat bg-center "
                        onClick={() => remove(index + 1)}
                      ></Button>
                    </div>
                  </div>
                </div>
              ) : !loadingPlayer ? (
                <Link to={`/dashboard/players?slot=${index + 1}`}>
                  <div className="relative h-full group ">
                    <div className="absolute inset-0 bg-[url(/llama.jpeg)] border text-white rounded items-center justify-center bg-no-repeat bg-cover opacity-50 lg:opacity-0 group-hover:opacity-50 transition-opacity duration-400 "></div>
                    <div className="flex relative z-10 h-full items-center justify-center text-white">
                      Add Player
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative h-full group ">
                  <div className="absolute inset-0 bg-[url(/llama.jpeg)] border text-white rounded items-center justify-center bg-no-repeat bg-cover opacity-50 lg:opacity-0 group-hover:opacity-50 transition-opacity duration-400 "></div>
                  <div className="flex relative z-10 h-full items-center justify-center text-white">
                    Loading
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center p-8 text-xl">
          <div>Total PR Points: {totalPr.toLocaleString("en-US")}</div>
          <div> Total Earnings: {totalEarnings.toLocaleString("en-US")}</div>
        </div>

        {!playerData.includes(null) && (
          <div className="flex flex-col justify-center items-center ">
            {user.requests >= 1 && !loadingGemini ? (
              <Button
                className="hover:cursor-pointer rounded-lg border border-white  px-5 py-2 text-lg font-medium font-inherit flex flex-row  justify-center items-center animate-pulse"
                onClick={() =>
                  askGemini(
                    playerData[0][0].player_name,
                    playerData[1][0].player_name,
                    playerData[2][0].player_name
                  )
                }
              >
                Ask Gemini
                <img src="/Gemini-Symbol.png" alt="Gemini" className="h-7 " />
              </Button>
            ) : loadingGemini ? (
              <div className="flex text-xl">
                <img
                  src="/Gemini-Symbol.png"
                  alt="Gemini"
                  className="h-7 animate-ping px-3"
                />
                Loading...
              </div>
            ) : (
              <div className="flex flex-row justify-center rounded-lg border border-white px-5 py-2 text-lg font-medium font-inherit items-center">
                Hit daily requests
              </div>
            )}

            {geminiResponse != null && (
              <div
                ref={responseRef}
                className=" w-80 sm:w-150 md:w-200 lg:w-300 py-20 prose prose-invert"
              >
                <img
                  src="/Gemini-Symbol.png"
                  alt="Gemini"
                  className="h-7 animate-bounce"
                />
                <ReactMarkdown>{geminiResponse}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrioView;
