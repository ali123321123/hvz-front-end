import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";

export const DeleteMission = (missionId) => {
  fetch(`${Endpoints.MISSION_API}/${missionId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getTokenInStorage(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) =>
    res.json().then((res) => {
      console.warn("result", res);
    })
  );
};



export const UpdateMission = (data, id) => {
    fetch(`${Endpoints.MISSION_API}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      res.json().then((res) => {
        console.warn("result", res);
      })
    );
  };

  export const DeletePlayer = (playerId) => {
    fetch(`${Endpoints.PLAYERS_API}/${playerId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) =>
      res.json().then((res) => {
        console.warn("result", res);
      })
    );
  };

  export const UpdateFactionPlayer = (player, newFaction) => {
    let data = {
        id: player.id,
        isHuman: newFaction === 1 ? true : false,
        isPatientZero: newFaction === 3 ? true : false,
        biteCode: player.biteCode,
        name: player.name,
        userId: player.userId,
        gameId: player.gameId
    }

    fetch(`${Endpoints.PLAYERS_API}/${player.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + getTokenInStorage(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  }