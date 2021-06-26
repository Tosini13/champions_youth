import { matchModeConst } from "../../const/matchConst";
import { Id, Result } from "../../const/structuresConst";

export type UpdateMatch = {
  tournamentId: Id;
  groupId?: Id;
  gameId?: Id;
  matchId: Id;
  mode?: matchModeConst;
  result?: Result | null;
  homeTeam?: Id | null;
  awayTeam?: Id | null;
  playOffsGroup?: boolean;
};

type UpdateGroupMatch = Omit<UpdateMatch, "gameId" | "playOffsGroup">;
type UpdatePlayOffsMatch = Omit<UpdateMatch, "groupId" | "playOffsGroup">;
type ToUpdatePlayOffsMatch = Omit<
  UpdatePlayOffsMatch,
  "tournamentId" | "matchId" | "gameId" | "playOffsGroup"
>;

export const updateMatch = ({
  tournamentId,
  groupId,
  gameId,
  matchId,
  mode,
  result,
  playOffsGroup,
  homeTeam,
  awayTeam,
}: UpdateMatch) => {
  if (playOffsGroup) {
    return updatePlayOffsGroupMatch({
      tournamentId,
      groupId,
      matchId,
      mode,
      result,
    });
  }
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
      homeTeam,
      awayTeam,
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
      .update({
        ...(mode !== undefined ? { mode } : {}),
        ...(result !== undefined ? { result } : {}),
      })
      .then(() => {
        dispatch({ type: "UPDATE_GROUP_MATCH" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GROUP_MATCH_ERROR", err });
      });
  };
};

const updatePlayOffsGroupMatch = ({
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
      .collection("playOffsGroups")
      .doc(groupId)
      .collection("matches")
      .doc(matchId)
      .update({
        ...(mode !== undefined ? { mode } : {}),
        ...(result !== undefined ? { result } : {}),
      })
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
  homeTeam,
  awayTeam,
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
      .update({
        ...(mode !== undefined ? { mode } : {}),
        ...(result !== undefined ? { result } : {}),
        ...(homeTeam !== undefined ? { homeTeam } : {}),
        ...(awayTeam !== undefined ? { awayTeam } : {}),
      })
      .then(() => {
        dispatch({ type: "UPDATE_PLAYOFFS_MATCH" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PLAYOFFS_MATCH_ERROR", err });
      });
  };
};
