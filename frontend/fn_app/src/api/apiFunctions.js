import api from "../api/axios";

export const getUserData = async (uuid) => {
  const res = await api.get(`/api/v1/user?uuid=${uuid}`);
  return res.data;
};

export const getPlayerData = async (playerName) => {
  if (!playerName) return null;
  const res = await api.get(`/api/v1/player?name=${playerName}`);
  return res.data[0];
};

export const updatePlayerSlot = async (uuid, slot, playerName) => {
  await api.put(`/api/v1/user/${uuid}?player${slot}=${playerName}`);
};

export const getAllPlayers = async (uuid) => {
  const res = await api.get(`/api/v1/player?uuid=${uuid}`);
  return res.data;
};

// export const getGeminiAnalysis = async ({ queryKey }) => {
//   const [_key, p1, p2, p3, uuid] = queryKey;

//   const prompt =
//     "In a couple sentences each, search the web and tell me about the following 3 Pro Fortnite players based on their gamer tags/online alias.\n" +
//     `- ${p1}\n` +
//     `- ${p2}\n` +
//     `- ${p3}\n` +
//     "(It's not a problem if you can't find anything about a player)." +
//     "-- Now write a small 1-3 sentences on the synergy, chemistry and overall evaluation of the players together for Trios FNCS.";

//   const response = await fetchGeminiResponse(prompt, uuid);
//   console.log(response);
//   return response.candidates[0].content.parts[0].text;
// };
