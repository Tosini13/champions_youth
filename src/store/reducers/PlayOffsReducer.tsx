const initState = {};
const playOffsReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_GAME":
      console.log("CREATE_GAME");
      return state;
    case "CREATE_GAME_ERROR":
      console.log("CREATE_GAME_ERROR", action.err);
      return state;
    case "CREATE_GAME_MATCH":
      console.log("CREATE_GAME_MATCH");
      return state;
    case "CREATE_GAME_MATCH_ERROR":
      console.log("CREATE_GAME_MATCH_ERROR", action.err);
      return state;
    default:
      return state;
  }
};

export default playOffsReducer;
