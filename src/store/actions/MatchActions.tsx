import { matchModeConst } from "../../const/matchConst";
import { Id, Result } from "../../const/structuresConst";

export type UpdateMatch = {
  tournamentId: Id;
  groupId?: Id;
  gameId?: Id;
  matchId: Id;
  mode?: matchModeConst;
  result?: Result;
};

type UpdateGroupMatch = Omit<UpdateMatch, "gameId">;
type UpdatePlayOffsMatch = Omit<UpdateMatch, "groupId">;

export const updateMatch = ({
  tournamentId,
  groupId,
  gameId,
  matchId,
  mode,
  result,
}: UpdateMatch) => {
  console.log(gameId, groupId);
  if (groupId) {
    return updateGroupMatch({ tournamentId, groupId, matchId, mode, result });
  }
  if (gameId) {
    return updatePlayOffsMatch({
      tournamentId,
      gameId,
      matchId,
      mode,
      result,
    });
  }
};

const updateGroupMatch = ({
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
        dispatch({ type: "UPDATE_GROUP_MATCH" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GROUP_MATCH_ERROR", err });
      });
  };
};

const updatePlayOffsMatch = ({
  tournamentId,
  gameId,
  matchId,
  mode,
  result,
}: UpdatePlayOffsMatch) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .doc(gameId)
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
        dispatch({ type: "UPDATE_PLAYOFFS_MATCH" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PLAYOFFS_MATCH_ERROR", err });
      });
  };
};
