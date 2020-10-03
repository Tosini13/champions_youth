import { TournamentStructure } from "../../structures/tournament";

const tournament = new TournamentStructure({ name: "zero", owner: "admin" });
tournament.id = "1";
const initState = {
  tournaments: [tournament],
};
const tournamentReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_TOURNAMENT":
      console.log("tournament created");
      return state;
    case "CREATE_TOURNAMENT_ERROR":
      console.log("tournament creation error", action.err);
      return state;
    case "IMAGE_UPLOADED":
      console.log("IMAGE_UPLOADED");
      return state;
    case "IMAGE_UPLOADED_ERROR":
      console.log("IMAGE_UPLOADED_ERROR", action.err);
      return state;
    case "DELETE_TOURNAMENT":
      console.log("tournament deleted");
      return state;
    case "DELETE_TOURNAMENT_ERROR":
      console.log("tournament deletion error", action.err);
      return state;
    default:
      return state;
  }
};

export default tournamentReducer;
