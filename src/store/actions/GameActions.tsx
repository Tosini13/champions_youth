import { Id } from "../../const/structuresConst";
import { matchModeConst } from "../../const/matchConst";

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

export type TResetNextGames = {
  tournamentId: Id;
};

export const resetNextGames = ({ tournamentId }: TResetNextGames) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();

    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("game.id", doc.id);
          doc.ref
            .update({
              homeTeam: null,
              awayTeam: null,
            })
            .then((game) => {
              console.log("game", game);
              resetMatches({ tournamentId, gameId: doc.id, firestore });
            })
            .catch((err) => {
              console.log("update", err);
            });
        });
      })
      .catch((err) => {
        console.log("get", err);
      });
  };
};

type TResetMatches = {
  tournamentId: Id;
  gameId: Id;
  firestore: any;
};

export const resetMatches = ({
  tournamentId,
  gameId,
  firestore,
}: TResetMatches) => {
  firestore
    .collection("tournaments")
    .doc(tournamentId)
    .collection("playOffs")
    .doc(gameId)
    .collection("matches")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref
          .update({
            home: null,
            away: null,
            mode: matchModeConst.notStarted,
            result: null,
          })
          .catch((err) => {});
      });
    })
    .catch((err) => {
      console.log("get", err);
    });
};
