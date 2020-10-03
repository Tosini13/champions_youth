const initState = {};
const teamReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "ADD_TEAM_TO_TOURNAMENT":
      console.log("team added to tournament");
      return state;
    case "ADD_TEAM_TO_TOURNAMENT_ERROR":
      console.log("team addition to tournament error", action.err);
      return state;
    case "DELETE_TEAM_FROM_TOURNAMENT":
      console.log("team deleted from tournament");
      return state;
    case "DELETE_TEAM_FROM_TOURNAMENT_ERROR":
      console.log("team deletion from tournament error", action.err);
      return state;
    case "EDIT_TEAM":
      console.log("team edited");
      return state;
    case "EDIT_TEAM_ERROR":
      console.log("team edition error", action.err);
      return state;
    default:
      return state;
  }
};

export default teamReducer;