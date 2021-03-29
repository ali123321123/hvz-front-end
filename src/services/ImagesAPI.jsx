import { getTokenInStorage } from "../utils/tokenHelper";
import Endpoints from "./endpoints";

export const updateImage = (game, imageId) => {
  const data = { ...game, imageUrl: imageId };
  console.log(JSON.stringify(data));
  return fetch(`${Endpoints.GAME_API}/${game.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getTokenInStorage(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
