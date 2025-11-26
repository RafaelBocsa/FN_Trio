import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlayerSlot } from "../api/apiFunctions";

export const useUpdatePlayerSlotMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, slot, playerName }) =>
      updatePlayerSlot(uuid, slot, playerName),

    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries(["user", uuid]);
    },
  });
};
