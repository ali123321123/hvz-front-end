import jwtDecode from "jwt-decode";

export const getTokenInStorage = () => {
  const token = sessionStorage.getItem("token");

  return token;
};

export const decodedToken = () => {
  const token = getTokenInStorage();
  if (token === null) {
    return null;
  }

  const decoded = jwtDecode(token);

  return decoded;
};
