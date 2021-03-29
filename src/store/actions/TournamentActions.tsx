import firebase from "firebase";
import moment from "moment";
import {
  getImageUrl,
  setImageJustUploaded,
} from "../../components/tournaments/actions/getImage";
import {
  TournamentCreateData,
  TournamentData,
} from "../../models/tournamentData";

export const createTournament = (data: TournamentCreateData, image?: any) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const logoName = image ? `${moment().format()}${image.name}` : undefined;
    if (image && logoName) {
      image.name = logoName;
      setImageJustUploaded(logoName, URL.createObjectURL(image), authorId); // should be tournamentId, but there's no, so authorId is instead!
    }
    firestore
      .collection("tournaments")
      .add({
        ...data,
        image: logoName,
        ownerId: authorId,
      })
      .then((res: any) => {
        console.log(res.id);
        if (image) {
          const storageRef = firebase.storage().ref();

          const ref = storageRef.child(
            getImageUrl({
              tournamentId: res.id,
              imageName: image.name,
            })
          );
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
  tournament: TournamentData,
  callBackSuccess?: () => void,
  callBackError?: () => void
) => {
  const path = `/tournaments/${tournament.id}`;
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result: any) {
        if (callBackSuccess) {
          callBackSuccess();
        }
        if (tournament.image) {
          const ref = firebase.storage().ref(`images/${tournament.id}`);
          ref
            .listAll()
            .then((dir) => {
              dir.items.forEach((fileRef) => {
                deleteFile(ref.fullPath, fileRef.name);
              });
              dispatch({ type: "DELETE_TOURNAMENT_DELETE_LOGO" });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: "DELETE_TOURNAMENT_OK_DELETE_LOGO_ERROR",
              });
            });
        } else {
          dispatch({ type: "DELETE_TOURNAMENT" });
        }
      })
      .catch(function (err: any) {
        if (callBackError) {
          callBackError();
        }
        dispatch({ type: "DELETE_TOURNAMENT_ERROR", err });
      });
  };
};

function deleteFile(pathToFile, fileName) {
  const ref = firebase.storage().ref(pathToFile);
  const childRef = ref.child(fileName);
  childRef.delete();
}
