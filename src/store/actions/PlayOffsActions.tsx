import { Id } from "../../const/structuresConst";
import { GameDataDb } from "../../structures/dbAPI/gameData";

export const createPlayoffs = (tournamentId: Id, games: GameDataDb[]) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    console.log(games);
    games.forEach((game: GameDataDb) => {
      firestore
        .collection("tournaments")
        .doc(tournamentId)
        .collection("playOffs")
        .doc(game.id)
        .set({
          id: game.id,
          winnerMatch: game.winnerMatch,
          loserMatch: game.loserMatch,
          previousMatchHome: game.previousMatchHome,
          previousMatchAway: game.previousMatchAway,
          round: game.round,
          placeholder: game.placeholder,
          homeTeam: game.homeTeam,
          awayTeam: game.awayTeam,
          order: game.order,
        })
        .then((res: any) => {
          console.log(res);
          const match = {
            ...game.match,
            id: "match",
          };
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("playOffs")
            .doc(game.id)
            .collection("matches")
            .doc("match")
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
              id: "returnMatch",
            };
            firestore
              .collection("tournaments")
              .doc(tournamentId)
              .collection("playOffs")
              .doc(game.id.toString())
              .collection("matches")
              .doc("returnMatch")
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
