const initState = {
  authError: null,
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("logged in");
      return {
        ...state,
        authError: null,
      };
    case "LOGIN_EROOR":
      console.log("logged in errror");
      return {
        ...state,
        authError: action.err.message,
      };
    case "SIGNOUT_SUCCESS":
      console.log("signed out");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_EROOR":
      console.log("signed out error");
      return {
        ...state,
        authError: action.err.message,
      };
    case "SIGNUP_SUCCESS":
      console.log("signed up");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      console.log("signed up error");
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
