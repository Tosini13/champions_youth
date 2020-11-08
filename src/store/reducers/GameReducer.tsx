const initState = {};
const gameReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "UPDATE_GAME":
      console.log("UPDATE_GAME");
      return state;
    case "UPDATE_GAME_ERROR":
      console.log("UPDATE_GAME_ERROR", action.err);
      return state;
    default:
      return state;
  }
};

export default gameReducer;
