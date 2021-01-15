import firebase from "firebase";
import { Id } from "../../const/structuresConst";
import { GameDataDb } from "../../structures/dbAPI/gameData";

export enum matchGame {
  match = "match",
  returnMatch = "returnMatch",
}

export const createPlayoffs = (tournamentId: Id, games: GameDataDb[]) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    games.forEach((game: GameDataDb) => {
      firestore
        .collection("tournaments")
        .doc(tournamentId)
        .collection("playOffs")
        .doc(`Game${game.id}`)
        .set({
          winnerMatch:
            game.winnerMatch !== null ? `Game${game.winnerMatch}` : null,
          loserMatch:
            game.loserMatch !== null ? `Game${game.loserMatch}` : null,
          previousMatchHome:
            game.previousMatchHome !== null
              ? `Game${game.previousMatchHome}`
              : null,
          previousMatchAway:
            game.previousMatchAway !== null
              ? `Game${game.previousMatchAway}`
              : null,
          round: game.round,
          placeholder: game.placeholder,
          homeTeam: game.homeTeam,
          awayTeam: game.awayTeam,
          order: game.order,
        })
        .then((res: any) => {
          const match = {
            ...game.match,
            id: matchGame.match,
          };
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("playOffs")
            .doc(`Game${game.id}`)
            .collection("matches")
            .doc(matchGame.match)
            .set({
              ...match,
            })
            .then(() => {
              dispatch({ type: "CREATE_GAME_MATCH" });
            })
            .catch((err: any) => {
              dispatch({ type: "CREATE_GAME_MATCH_ERROR", err });
            });

          if (game.returnMatch) {
            const returnMatch = {
              ...game.match,
              id: matchGame.returnMatch,
            };
            firestore
              .collection("tournaments")
              .doc(tournamentId)
              .collection("playOffs")
              .doc(game.id.toString())
              .collection("matches")
              .doc(matchGame.returnMatch)
              .set({
                ...returnMatch,
              })
              .then(() => {
                dispatch({ type: "CREATE_GAME_MATCH" });
              })
              .catch((err: any) => {
                dispatch({ type: "CREATE_GAME_MATCH_ERROR", err });
              });
          }

          dispatch({ type: "CREATE_GAME" });
        })
        .catch((err: any) => {
          dispatch({ type: "CREATE_GAME_ERROR", err });
        });
    });
  };
};

export const deletePlayOffs = (
  tournamentId: Id,
  callBackSuccess?: () => void,
  callBackError?: () => void
) => {
  const path = `/tournaments/${tournamentId}/playOffs`;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result) {
        if (callBackSuccess) {
          callBackSuccess();
        }
        dispatch({ type: "DELETE_PLAYOFFS_FROM_TOURNAMENT" });
      })
      .catch(function (err) {
        if (callBackError) {
          callBackError();
        }
        dispatch({ type: "DELETE_PLAYOFFS_FROM_TOURNAMENT_ERROR", err });
      });
  };
};

export const deletePlayOffsGroups = (
  tournamentId: Id,
  callBackSuccess?: () => void,
  callBackError?: () => void
) => {
  const path = `/tournaments/${tournamentId}/playOffsGroups`;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result) {
        if (callBackSuccess) {
          callBackSuccess();
        }
        dispatch({ type: "DELETE_PLAYOFFS_GROUPS_FROM_TOURNAMENT" });
      })
      .catch(function (err) {
        if (callBackError) {
          callBackError();
        }
        dispatch({
          type: "DELETE_PLAYOFFS_GROUPS_FROM_TOURNAMENT_ERROR",
          err,
        });
      });
  };
};
