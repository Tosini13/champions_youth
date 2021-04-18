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

    console.log("tournamentId", tournamentId);
    console.log("teamsId", teamsId);
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .get()
      .then((snapshot) => {
        console.log("snapshot", snapshot);
        snapshot.forEach((gameSnapshot) => {
          const gameFields = gameSnapshot.xf.nn.proto.mapValue.fields;
          const isHomeTeam = teamsId.includes(gameFields.homeTeam.stringValue);
          const isAwayTeam = teamsId.includes(gameFields.awayTeam.stringValue);

          console.log("gameSnapshot.id", gameSnapshot.id);
          console.log("gameFields.homeTeam", gameFields.homeTeam.stringValue);
          console.log("gameFields.awayTeam", gameFields.awayTeam.stringValue);
          console.log("isHomeTeam", isHomeTeam);
          console.log("isAwayTeam", isAwayTeam);

          gameSnapshot.ref
            .update({
              homeTeam: isHomeTeam ? null : undefined,
              awayTeam: isAwayTeam ? null : undefined,
            })
            .then(() => {
              if (isHomeTeam || isAwayTeam) {
                resetMatches({
                  tournamentId,
                  gameId: gameSnapshot.id,
                  teamsId,
                  firestore,
                });
              }
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
        console.log("matchSnapshot", matchSnapshot);
        const matchFields = matchSnapshot.xf.nn.proto.mapValue.fields;
        console.log("matchFields", matchFields);
        const isHome = teamsId.includes(matchFields.home.stringValue);
        const isAway = teamsId.includes(matchFields.away.stringValue);
        console.log("matchSnapshot.id", matchSnapshot.id);
        console.log("isHome", isHome);
        console.log("isAway", isAway);
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

export type TResetGames = {
  tournamentId: Id;
  teamsId: Id[];
};

export const resetGames = ({ tournamentId, teamsId }: TResetGames) => {
  // reset 1) game home/away 2) match result and home/away 3) rematch if exists result and home/away
  console.log("resetGames! ------------------------");
  console.log("Ids", tournamentId, teamsId);
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    console.log("inner func");
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffs")
      .get()
      .then((games) => {
        console.log("games", games);
        games.forEach((gameSnapshot) => {
          // // check just teams
          // if (teamId === gameFields.homeTeam) {
          // } else if (teamId === gameFields.awayTeam) {
          // }
          // const winnerGameId: Id | undefined =
          //   gameFields.winnerMatch.stringValue;

          // // NOOO
          // console.log("doc.id === gameId", gameSnapshot.id === gameId);
          // if (gameSnapshot.id === gameId) {
          //   const winnerGameId: Id | undefined =
          //     gameSnapshot.xf.nn.proto.mapValue.fields.winnerMatch.stringValue;
          //   const looserGameId: Id | undefined =
          //     gameSnapshot.xf.nn.proto.mapValue.fields.loserMatch.stringValue;

          //   if (winnerGameId) {
          //     // check games again
          //   }
          //   if (looserGameId) {
          //     // check games again
          //   }
          // }

          // // console.log(
          // //   "doc.xf.nn.proto.mapValue.fields.winnerMatch",
          // //   gameSnapshot.xf.nn.proto.mapValue.fields.winnerMatch.stringValue
          // // );
          // // // doc.ref.once("value").then((snapshotGame) => {
          // // // });

          const gameFields = gameSnapshot.xf.nn.proto.mapValue.fields;
          const isHomeTeam = teamsId.includes(gameFields.homeTeam);
          const isAwayTeam = teamsId.includes(gameFields.awayTeam);

          console.log("gameSnapshot.id", gameSnapshot.id);
          console.log("isHomeTeam", isHomeTeam);
          console.log("isAwayTeam", isAwayTeam);

          gameSnapshot.ref
            .update({
              homeTeam: isHomeTeam ? null : undefined,
              awayTeam: isAwayTeam ? null : undefined,
            })
            .then(() => {
              if (isHomeTeam || isAwayTeam) {
                resetMatches({
                  tournamentId,
                  gameId: gameSnapshot.id,
                  teamsId,
                  firestore,
                });
              }
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
