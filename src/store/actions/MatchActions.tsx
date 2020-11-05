import { matchModeConst } from "../../const/matchConst";
import { Id, Result } from "../../const/structuresConst";

export type UpdateGroupMatch = {
  tournamentId: Id;
  groupId: Id;
  matchId: Id;
  mode?: matchModeConst;
  result?: Result;
};

export const updateGroupMatch = ({
  tournamentId,
  groupId,
  matchId,
  mode,
  result,
}: UpdateGroupMatch) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .doc(groupId)
      .collection("matches")
      .doc(matchId)
      .update(
        mode && result
          ? { mode, result }
          : mode
          ? { mode }
          : result
          ? { result }
          : {}
      )
      .then(() => {
        dispatch({ type: "UPDATE_GROUP_MATCH_MODE" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GROUP_MATCH_MODE_ERROR", err });
      });
  };
};
