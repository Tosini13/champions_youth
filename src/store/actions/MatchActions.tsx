import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";

export const updateGroupMatchMode = (
  tournamentId: Id,
  groundId: Id,
  matchId: Id,
  mode: matchModeConst
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    console.log(mode);
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .doc(groundId)
      .collection("matches")
      .doc(matchId)
      .update({
        mode,
      })
      .then(() => {
        dispatch({ type: "UPDATE_GROUP_MATCH_MODE" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GROUP_MATCH_MODE_ERROR", err });
      });
  };
};
