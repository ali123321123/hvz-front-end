const initialState = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  roles: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
         id: action.data.id,
         username: action.data.username,
         firstName: action.data.firstName,
         lastName: action.data.lastName,
         roles: action.data.roles,
      };

    case "USER_LOGGED_OUT":
      return { initialState };

    default:
      break;
  }
}

export default loginReducer;
