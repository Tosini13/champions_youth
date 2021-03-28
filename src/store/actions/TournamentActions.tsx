import firebase from "firebase";
import moment from "moment";
import { setImageJustUploaded } from "../../components/tournaments/actions/getImage";
import { Id } from "../../const/structuresConst";
import { TournamentCreateData } from "../../models/tournamentData";

export const createTournament = (data: TournamentCreateData, image?: any) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const logoName = image ? `${moment().format()}${image.name}` : undefined;
    if (image && logoName) {
      image.name = logoName;
      setImageJustUploaded(logoName, URL.createObjectURL(image), authorId);
    }
    firestore
      .collection("tournaments")
      .add({
        ...data,
        image: logoName,
        ownerId: authorId,
      })
      .then((res: any) => {
        if (image) {
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child(`images/${authorId}/${image.name}`);
          ref
            .put(image)
            .then((res) => {
              dispatch({ type: "CREATE_TOURNAMENT_IMAGE_UPLOADED", data });
            })
            .catch((err) => {
              dispatch({
                type: "CREATE_TOURNAMENT_IMAGE_UPLOADED_ERROR",
                data,
              });
            });
        } else {
          dispatch({ type: "CREATE_TOURNAMENT", data });
        }
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_TOURNAMENT_ERROR", err });
      });
  };
};

export const deleteTournament = (
  tournamentId: Id,
  callBackSuccess?: () => void,
  callBackError?: () => void
) => {
  const path = `/tournaments/${tournamentId}`;
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result: any) {
        if (callBackSuccess) {
          callBackSuccess();
        }
        dispatch({ type: "DELETE_TOURNAMENT" });
      })
      .catch(function (err: any) {
        if (callBackError) {
          callBackError();
        }
        dispatch({ type: "DELETE_TOURNAMENT_ERROR", err });
      });
  };
};
