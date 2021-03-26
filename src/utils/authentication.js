import Store from "./store";
import jwtDecode from "jwt-decode";
import { getTokenInStorage } from "./tokenHelper";

const Auth = {
  loginUser: async (data) => {
    sessionStorage.setItem("token", data.token);
    localStorage.setItem("token", data.token);
    const decoded = jwtDecode(data.token);
    await Store.dispatch({
      type: "USER_LOGGED_IN",
      data: {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        roles: data.roles,
        expires: decoded.exp
      },
    });
  },

  logoutUser: async () => {
    await sessionStorage.removeItem("token");
    await localStorage.removeItem("token");
    Store.dispatch({ type: "USER_LOGGED_OUT" });
  },

  checkTokenInStorage: () => {
    const jwt = sessionStorage.getItem("token");
    if (!jwt) {
      const localJwt = localStorage.getItem("token");
      if (!localJwt) {
        return;
      }
      const localToken = jwtDecode(localJwt);
      const localNow = Date.now();
      const localExp = localToken.exp * 1000;
      if (localToken && localExp && localExp > localNow) {
        Auth.loginUser(localJwt);
      }
    }
    const token = jwtDecode(jwt);
    const now = Date.now();
    const exp = token.exp * 1000;
    if (token && exp && exp > now) {
      Auth.loginUser(jwt);
    }
  },

  userIsLoggedIn: () => {
    const token = sessionStorage.getItem('token')
    if(token){
        return true
    }
    return false;
  },

  userIsAdmin: () => {
    if (Auth.userIsLoggedIn()) {
      let decodedToken = jwtDecode(getTokenInStorage());
      if (decodedToken.role === "Admin") {
        return true;
      }
      return false;
    }
    return false;

  },
};

export default Auth;
