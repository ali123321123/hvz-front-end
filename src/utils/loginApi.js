import Validation from "./validation";

const url = "https://localhost:44390/api";

export async function loginRequest(username, pw) {
  const data = {
    username: username,
    password: pw,
  };

  return await fetch(`${url}/users/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => Validation.responseFromAuthenticateApi(r))
    
}
