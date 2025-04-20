import axios from "axios";

const URL_PLAYERS = "http://localhost:8080/api/v1/player";
const URL_USER = "http://localhost:8080/";

export async function getPlayers() {
  return await axios.get(URL_PLAYERS);
}
