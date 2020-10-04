import { Id } from "../../const/structuresConst";

export const setFavorites = (userId: Id, favoriteTournaments: Id[]) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userId)
      .update({
        favoriteTournaments,
      })
      .then(() => {
        dispatch({ type: "FAVORITES_UPDATED" });
      })
      .catch((err: any) => {
        dispatch({ type: "FAVORITES_UPDATED_ERROR", err });
      });
  };
};
