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
    case "CREATE_TOURNAMENT_IMAGE_UPLOADED":
      console.log("CREATE_TOURNAMENT_IMAGE_UPLOADED");
      return state;
    case "CREATE_TOURNAMENT_IMAGE_UPLOADED_ERROR":
      console.log("CREATE_TOURNAMENT_IMAGE_UPLOADED_ERROR", action.err);
      return state;

    case "UPDATED_TOURNAMENT":
      console.log("UPDATED_TOURNAMENT");
      return state;
    case "UPDATED_TOURNAMENT_ERROR":
      console.log("UPDATED_TOURNAMENT_ERROR");
      return state;
    case "UPDATED_TOURNAMENT_IMAGE_UPLOADED_ERROR":
      console.log("UPDATED_TOURNAMENT_IMAGE_UPLOADED_ERROR");
      return state;
    case "UPDATED_TOURNAMENT_IMAGE_UPLOADED":
      console.log("UPDATED_TOURNAMENT_IMAGE_UPLOADED");
      return state;
    case "UPDATED_TOURNAMENT_OK_DELETE_LOGO_ERROR":
      console.log("UPDATED_TOURNAMENT_OK_DELETE_LOGO_ERROR");
      return state;
    case "UPDATED_TOURNAMENT_DELETE_LOGO":
      console.log("UPDATED_TOURNAMENT_DELETE_LOGO");
      return state;

    case "DELETE_TOURNAMENT":
      console.log("tournament deleted");
      return state;
    case "DELETE_TOURNAMENT_ERROR":
      console.log("DELETE_TOURNAMENT_ERROR", action.err);
      return state;
    case "DELETE_TOURNAMENT_DELETE_LOGO":
      console.log("DELETE_TOURNAMENT_DELETE_LOGO", action.err);
      return state;
    case "DELETE_TOURNAMENT_OK_DELETE_LOGO_ERROR":
      console.log("DELETE_TOURNAMENT_OK_DELETE_LOGO_ERROR", action.err);
      return state;
    default:
      return state;
  }
};

export default tournamentReducer;
