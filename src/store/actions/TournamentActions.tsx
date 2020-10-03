import firebase from "firebase";
import { Id } from "../../const/structuresConst";
import { TournamentCreateData } from "../../models/tournamentData";

export const createTournament = (data: TournamentCreateData) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    // const authorId = getState().firebase.auth.uid;
    firestore
      .collection("tournaments")
      .add({
        ...data,
        // ownerId: authorId,
      })
      .then((res: any) => {
        dispatch({ type: "CREATE_TOURNAMENT", data });
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_TOURNAMENT_ERROR", err });
      });
  };
};

export const deleteTournament = (tournamentId: Id) => {
  const path = `/tournaments/${tournamentId}`;
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result: any) {
        dispatch({ type: "DELETE_TOURNAMENT" });
      })
      .catch(function (err: any) {
        dispatch({ type: "DELETE_TOURNAMENT_ERROR", err });
      });
  };
};
