const initState = {};
const matchReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "UPDATE_GROUP_MATCH":
      console.log("UPDATE_GROUP_MATCH");
      return state;
    case "UPDATE_GROUP_MATCH_ERROR":
      console.log("UPDATE_GROUP_MATCH_ERROR", action.err);
      return state;
    case "UPDATE_PLAYOFFS_MATCH":
      console.log("UPDATE_PLAYOFFS_MATCH");
      return state;
    case "UPDATE_PLAYOFFS_MATCH_ERROR":
      console.log("UPDATE_PLAYOFFS_MATCH_ERROR", action.err);
      return state;
    default:
      return state;
  }
};

export default matchReducer;
