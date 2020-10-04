const initState = {};

const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "FAVORITES_UPDATED":
      console.log("FAVORITES_UPDATED");
      return state;
    case "FAVORITES_UPDATED_ERROR":
      console.log("FAVORITES_UPDATED_ERROR", action.err);
      return state;
    default:
      return state;
  }
};

export default userReducer;
