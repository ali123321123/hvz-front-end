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
