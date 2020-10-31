import firebase from "firebase";
import { Id } from "../../const/structuresConst";
import { TeamCreateData, TeamData } from "../../models/teamData";

export const addTeamToTournament = (
  tournamentId: Id,
  team: TeamCreateData,
  image?: any
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .add({
        name: team.name,
        logo: image && team.logo ? team.logo : null,
      })
      .then(() => {
        dispatch({ type: "ADD_TEAM_TO_TOURNAMENT" });
        if (image) {
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child(`images/${authorId}/${image.name}`);
          ref
            .put(image)
            .then((res) => dispatch({ type: "IMAGE_UPLOADED" }))
            .catch((err) => dispatch({ type: "IMAGE_UPLOADED_ERROR" }));
        }
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

export const editTeamFromTournament = (tournamentId: Id, team: TeamData) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const teamDb = {
      name: team.name,
    };
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .doc(team.id)
      .update({
        ...teamDb,
      })
      .then(() => {
        dispatch({ type: "EDIT_TEAM" });
      })
      .catch((err: any) => {
        dispatch({ type: "EDIT_TEAM_ERROR", err });
      });
  };
};
