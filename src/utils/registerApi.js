import Endpoints from "../services/endpoints";

export async function registerRequest(data) {
    console.log(data);
    return await fetch(`${Endpoints.USERS_API}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((r) => r.json())
}