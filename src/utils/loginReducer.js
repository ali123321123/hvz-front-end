const initialState = {};

const store = (
  state = {
    loggedInUser: {},
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        loggedInUser: action.data
      };

    case "USER_LOGGED_OUT":
      return { loggedInUser: initialState };

    default:
      return state.loggedInUser;
  }
};

export default store;
