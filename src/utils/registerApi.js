import Endpoints from "../services/endpoints";
import Validation from "./validation";

export async function registrationRequest(data) {
  

  return await fetch(`${Endpoints.USERS_API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => Validation.responseFromRegisterApi(r));
}