import Store from './store'
import jwtDecode from 'jwt-decode'

const Auth = {
    loginUser: (data) => {
        sessionStorage.setItem('token', data.token);
        Store.dispatch({
            type: 'USER_LOGGED_IN',
            data:{
                id: data.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                roles: data.roles,
            }
        })

    },

    logoutUser: async () => {
        await sessionStorage.removeItem('token');
        Store.dispatch({type: 'USER_LOGGED_OUT'});
    },

    checkTokenInStorage: () => {
        const jwt = sessionStorage.getItem('token');
        if(!jwt){
            return;
        }
        const token = jwtDecode(jwt);
        const now = Date.now();
        const exp = token.exp * 1000;
        if(token && exp && exp > now) {
            Auth.loginUser(jwt);
        }
    },

    userIsLoggedIn: () => {
        let userData = Store.getState();
        const now = Date.now();
        if (userData && userData.expires) {
            const expires = userData.expires * 1000;
            if (userData && expires && expires > now) {
              return true;
            }
          }
          return false;

    }


}

export default Auth;