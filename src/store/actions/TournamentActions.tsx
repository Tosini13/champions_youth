import firebase from "firebase";
import { Id } from "../../const/structuresConst";
import { TournamentCreateData } from "../../models/tournamentData";

export const createTournament = (data: TournamentCreateData, image?: any) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("tournaments")
      .add({
        ...data,
        image: image ? image.name : null,
        ownerId: authorId,
      })
      .then((res: any) => {
        dispatch({ type: "CREATE_TOURNAMENT", data });
        if (image) {
          const firestore = getFirestore();
          const authorId = getState().firebase.auth.uid;
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child(`images/${authorId}/${image.name}`);
          ref
            .put(image)
            .then((res) => dispatch({ type: "IMAGE_UPLOADED" }))
            .catch((err) => dispatch({ type: "IMAGE_UPLOADED_ERROR" }));
        }
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
