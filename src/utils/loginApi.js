import Endpoints from "../services/endpoints";
import Validation from "./validation";

export async function loginRequest(username, pw) {
  const data = {
    username: username,
    password: pw,
  };

  return await fetch(`${Endpoints.USERS_API}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => Validation.responseFromAuthenticateApi(r));
}
