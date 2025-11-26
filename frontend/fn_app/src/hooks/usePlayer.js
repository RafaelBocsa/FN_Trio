import { useQuery } from "@tanstack/react-query";
import { getPlayerData } from "../api/apiFunctions";

export function usePlayer(playerName, slot) {
  return useQuery({
    queryKey: ["player", slot, playerName],
    queryFn: () => getPlayerData(playerName),
    refetchOnWindowFocus: false,
    enabled: !!playerName,
  });
}
