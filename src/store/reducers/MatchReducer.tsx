const initState = {};
const matchReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "UPDATE_GROUP_MATCH_MODE":
      console.log("UPDATE_GROUP_MATCH_MODE");
      return state;
    case "UPDATE_GROUP_MATCH_MODE_ERROR":
      console.log("UPDATE_GROUP_MATCH_MODE_ERROR");
      return state;
    default:
      return state;
  }
};

export default matchReducer;
