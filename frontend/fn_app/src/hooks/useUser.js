import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/apiFunctions";

export function useUser(uuid) {
  return useQuery({
    queryKey: ["user", uuid],
    queryFn: () => getUserData(uuid),
    refetchOnWindowFocus: false,
    enabled: !!uuid,
  });
}
