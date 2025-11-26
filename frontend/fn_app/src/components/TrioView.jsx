import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useMemo,
  use,
} from "react";
import { useLocation } from "react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { UserContext } from "./Dashboard";
import { Button } from "@headlessui/react";
import ReactMarkdown from "react-markdown";
import { fetchGeminiResponse } from "../api/gemini";
import Card from "./PlayerCard";
import { useUser } from "../hooks/useUser";
import { usePlayer } from "../hooks/usePlayer";
import { useGemini } from "../hooks/useGemini";
import TrioPoints from "./TrioPoints";
// import { getGeminiAnalysis } from "../api/apiFunctions";

const TrioView = () => {
  const { userInfo } = useContext(UserContext);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [loadingGemini, setLoadingGemini] = useState(false);
  const responseRef = useRef(null);
  const state = useLocation();
  const updatedSlot = state?.updatedSlot;
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useUser(userInfo.uuid);

  const p1 = usePlayer(user?.player1, 1);
  const p2 = usePlayer(user?.player2, 2);
  const p3 = usePlayer(user?.player3, 3);

  // const geminiQueryKey = [
  //   "gemini",
  //   p1?.data?.player_name,
  //   p2?.data?.player_name,
  //   p3?.data?.player_name,
  //   userInfo.uuid,
  // ];

  const containsTrio =
    p1.data?.player_name && p2.data?.player_name && p3.data?.player_name;

  useEffect(() => {
    if (updatedSlot) {
      queryClient.invalidateQueries(["player", updatedSlot]);
    }
  }, [updatedSlot]);

  // const {
  //   data: geminiResponse,
  //   isFetching: loadingGemini,
  //   refetch: refetchGemini,
  // } = useQuery({
  //   queryKey: [
  //     "gemini",
  //     p1?.data?.player_name,
  //     p2?.data?.player_name,
  //     p3?.data?.player_name,
  //     userInfo.uuid,
  //   ],
  //   queryFn: () =>
  //     getGeminiAnalysis(
  //       p1.data.player_name,
  //       p2.data.player_name,
  //       p3.data.player_name,
  //       userInfo.uuid
  //     ),
  //   enabled:
  //     !!p1?.data?.player_name &&
  //     !!p2?.data?.player_name &&
  //     !!p3?.data?.player_name,
  //   staleTime: Infinity, // cache forever
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   cacheTime: 1000 * 60 * 60 * 24, // keep for 24h
  // });

  //scroll on geminiResponse
  useEffect(() => {
    if (geminiResponse && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [geminiResponse]);

  const askGemini = async (p1, p2, p3) => {
    setLoadingGemini(true);
    setGeminiResponse(null);
    try {
      const prompt =
        "In a couple sentances each, search the web and tell me about the following 3 Pro Fortnite players based on their gamer tags/online alias. \n" +
        "-" +
        p1 +
        "\n" +
        "-" +
        p2 +
        "\n" +
        "-" +
        p3 +
        "\n" +
        "(It's not a problem if you can't find anything about a player)." +
        "--" +
        "Now write a small 1-3 sentances on the possible synergy, chemestry and overall evaluation of the players together as a team for Trios FNCS.";
      console.log(user.requests);
      if (user.requests > 0) {
        const response = await fetchGeminiResponse(prompt, userInfo.uuid);
        setGeminiResponse(response.candidates[0].content.parts[0].text);
        // await getUserData(); //update user gemini request count
        queryClient.invalidateQueries(["user", userInfo.uuid]);
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
          <Card
            index={1}
            playerData={p1.data}
            user={user}
            loading={p1.isLoading}
            userLoading={userLoading}
            loadingGemini={loadingGemini}
          />
          <Card
            index={2}
            playerData={p2.data}
            user={user}
            loading={p2.isLoading}
            userLoading={userLoading}
            loadingGemini={loadingGemini}
          />
          <Card
            index={3}
            playerData={p3.data}
            user={user}
            loading={p3.isLoading}
            userLoading={userLoading}
            loadingGemini={loadingGemini}
          />
        </div>
        <div className="flex flex-col items-center p-8 text-xl">
          <TrioPoints p1={p1.data} p2={p2.data} p3={p3.data} />
        </div>
        {containsTrio && (
          <div className="flex flex-col justify-center items-center ">
            {user.requests >= 1 && !loadingGemini ? (
              <Button
                className="hover:cursor-pointer rounded-lg border border-white  px-5 py-2 text-lg font-medium font-inherit flex flex-row  justify-center items-center animate-pulse"
                onClick={() =>
                  askGemini(
                    p1.data?.player_name,
                    p2.data?.player_name,
                    p3.data?.player_name
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

            {geminiResponse && (
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
