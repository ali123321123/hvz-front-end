import Endpoints from "../services/endpoints";

export async function createGame(data){

      return await fetch(`${Endpoints.GAME_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json().then((res) => console.warn("result", res)));
}
