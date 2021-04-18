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
  teamsId: Id[];
  gamesId: Id[];
};

export const resetNextGames = ({
  tournamentId,
  teamsId,
  gamesId,
}: TResetNextGames) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();

    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .get()
      .then((snapshot) => {
        const recursiveReset = (gameId, teamsId) => {
          let gameSnapshot: any = undefined;
          snapshot.forEach((snapshot) =>
            snapshot.id === gameId ? (gameSnapshot = snapshot) : {}
          );
          if (gameSnapshot) {
            const gameFields = gameSnapshot.xf.nn.proto.mapValue.fields;
            const homeId = gameFields.homeTeam?.stringValue;
            const awayId = gameFields.awayTeam?.stringValue;
            const isHomeTeam = teamsId.find((teamId) => teamId === homeId);
            const isAwayTeam = teamsId.find((teamId) => teamId === awayId);
            const winnerGameId = gameFields.winnerMatch?.stringValue;
            const looserGameId = gameFields.loserMatch?.stringValue;
            if (isHomeTeam || isAwayTeam) {
              // reset game and matches
              const copyTeamsId = teamsId.slice(0);
              gameSnapshot.ref
                .update({
                  homeTeam: isHomeTeam ? null : undefined,
                  awayTeam: isAwayTeam ? null : undefined,
                })
                .then(() => {
                  resetMatches({
                    tournamentId,
                    gameId,
                    teamsId: copyTeamsId,
                    firestore,
                  });
                })
                .catch((err) => {
                  console.log("update", err);
                });

              if (!isHomeTeam) {
                teamsId.push(homeId);
              }
              if (!isAwayTeam) {
                teamsId.push(awayId);
              }
              if (winnerGameId) {
                recursiveReset(winnerGameId, teamsId);
              }
              if (looserGameId) {
                recursiveReset(looserGameId, teamsId);
              }
            }
          }
        };

        gamesId.forEach((gameId) => {
          const copyTeamsId = teamsId.slice(0);
          recursiveReset(gameId, copyTeamsId);
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
  teamsId: Id[];
  firestore: any;
};

export const resetMatches = ({
  tournamentId,
  gameId,
  teamsId,
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
      snapshot.forEach((matchSnapshot) => {
        const matchFields = matchSnapshot.xf.nn.proto.mapValue.fields;
        const isHome = teamsId.includes(matchFields.home.stringValue);
        const isAway = teamsId.includes(matchFields.away.stringValue);
        matchSnapshot.ref
          .update({
            home: isHome ? null : undefined,
            away: isAway ? null : undefined,
            mode: isHome || isAway ? matchModeConst.notStarted : undefined,
            result: isHome || isAway ? null : undefined,
          })
          .catch((err) => {});
      });
    })
    .catch((err) => {
      console.log("get", err);
    });
};
