import { Id } from "../../const/structuresConst";
import { TeamCreateData } from "../../models/teamData";

export const addTeamToTournament = (tournamentId: Id, team: TeamCreateData) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .add({
        ...team,
      })
      .then(() => {
        dispatch({ type: "ADD_TEAM_TO_TOURNAMENT" });
      })
      .catch((err: any) => {
        dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_ERROR", err });
      });
  };
};

export const deleteTeamFromTournament = (tournamentId: Id, teamId: Id) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .doc(teamId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT" });
      })
      .catch((err: any) => {
        dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT_ERROR", err });
      });
  };
};

export const editTeamFromTournament = (
  tournamentId: Id,
  teamId: Id,
  team: any
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .doc(teamId)
      .update({
        ...team,
      })
      .then(() => {
        dispatch({ type: "EDIT_TEAM" });
      })
      .catch((err: any) => {
        dispatch({ type: "EDIT_TEAM_ERROR", err });
      });
  };
};
