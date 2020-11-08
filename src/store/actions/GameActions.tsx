import { Id } from "../../const/structuresConst";

export type UpdateGame = {
  tournamentId: Id;
  gameId: Id;
  homeTeam?: Id | null;
  awayTeam?: Id | null;
  returnMatch: boolean;
};

type UpdateHomeTeamGame = Omit<UpdateGame, "awayTeam">;
type UpdateAwayTeamGame = Omit<UpdateGame, "homeTeam">;

export const updateGame = ({
  tournamentId,
  gameId,
  homeTeam,
  awayTeam,
  returnMatch,
}: UpdateGame) => {
  if (homeTeam !== undefined) {
    return updateGameHomeTeam({ tournamentId, gameId, homeTeam, returnMatch });
  }
  if (awayTeam !== undefined) {
    return updateGameAwayTeam({ tournamentId, gameId, awayTeam, returnMatch });
  }
};

const updateGameHomeTeam = ({
  tournamentId,
  gameId,
  homeTeam,
  returnMatch,
}: UpdateHomeTeamGame) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .doc(gameId)
      .update({ homeTeam })
      .then(() => {
        dispatch({ type: "UPDATE_GAME" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GAME_ERROR", err });
      });
  };
};

const updateGameAwayTeam = ({
  tournamentId,
  gameId,
  awayTeam,
  returnMatch,
}: UpdateAwayTeamGame) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .doc(gameId)
      .update({ awayTeam })
      .then(() => {
        dispatch({ type: "UPDATE_GAME" });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_GAME_ERROR", err });
      });
  };
};
