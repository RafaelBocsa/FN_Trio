import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
import { useUpdatePlayerSlotMutation } from "../hooks/useUpdateUserPlayerMut";

const PlayerCard = ({
  index,
  playerData,
  user,
  loading,
  userLoading,
  loadingGemini,
}) => {
  const { mutate: removePlayer } = useUpdatePlayerSlotMutation();

  const removePlayerHelper = (uuid, slot, playerName) => {
    if (!loadingGemini) {
      removePlayer({
        uuid: user.uuid,
        slot: index,
        playerName: null,
      });
    }
  };

  return (
    <div className="border rounded  w-[20rem] h-[30rem] text-center">
      {loading || userLoading ? (
        <div className="relative h-full group ">
          <div className="absolute inset-0 bg-[url(/llama.jpeg)] border text-white rounded items-center justify-center bg-no-repeat bg-cover opacity-50 lg:opacity-0 group-hover:opacity-50 transition-opacity duration-400 "></div>
          <div className="flex relative z-10 h-full items-center justify-center text-white">
            Loading
          </div>
        </div>
      ) : playerData ? (
        <div className=" relative h-full w-full ">
          <div className="absolute inset-0 bg-[url(/llama.jpeg)]  text-white  bg-no-repeat bg-cover opacity-50"></div>
          <div className="relative z-10 h-full backdrop-blur-sm">
            <div className="flex justify-center p-10 items-center ">
              <img
                src={playerData.profileImageUrl || "/icon.png"}
                alt="Country Flag"
                className="w-38 h-38 object-contain border"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <img
                src={playerData.countryImageUrl || "/globe.png"}
                alt="Country Flag"
                className="h-12 w-12 "
              />
              <p className="text-2xl ">{playerData.player_name}</p>
            </div>

            <div className="flex flex-col items-center p-4 gap-1 text-lga">
              <p>PR Points: {playerData.pr_points.toLocaleString("en-US")}</p>
              <p>
                Earnings: {"$" + playerData.earnings.toLocaleString("en-US")}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 justify-end p-4 ">
              <Button
                id="button1"
                className="hover:text-red-500 w-8 h-8 bg-[url(/public/trash.svg)] bg-contain bg-no-repeat bg-center "
                onClick={() => removePlayerHelper(user.uuid, index, null)}
              ></Button>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/dashboard/players?slot=${index}`}>
          <div className="relative h-full group ">
            <div className="absolute inset-0 bg-[url(/llama.jpeg)] border text-white rounded items-center justify-center bg-no-repeat bg-cover opacity-50 lg:opacity-0 group-hover:opacity-50 transition-opacity duration-400 "></div>
            <div className="flex relative z-10 h-full items-center justify-center text-white">
              Add Player
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PlayerCard;
