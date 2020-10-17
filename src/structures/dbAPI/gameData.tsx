import { Id } from "../../const/structuresConst";
import { GameStructure } from "../game";
import { MatchStructure } from "../match";
import { matchDbApi, MatchDataDb } from "./matchData";

export class GameDbApi {
  convertGameToDb = (game: GameDataApp) => {
    const gameDb: GameDataDb = {
      id: game.id,
      winnerMatch: game.winnerMatch?.id ? game.winnerMatch.id : null,
      loserMatch: game.loserMatch?.id ? game.loserMatch.id : null,
      previousMatchHome: game.previousMatchHome?.id
        ? game.previousMatchHome.id
        : null,
      previousMatchAway: game.previousMatchAway?.id
        ? game.previousMatchAway.id
        : null,
      round: game.round,
      match: matchDbApi.convertMatchToDb(game.match),
      returnMatch: game.returnMatch
        ? matchDbApi.convertMatchToDb(game.returnMatch)
        : null,
    };
    return gameDb;
  };
}

export const gameDbApi = new GameDbApi();

export type GameDataApp = {
  id: Id;
  winnerMatch?: GameStructure;
  loserMatch?: GameStructure;
  previousMatchHome?: GameStructure;
  previousMatchAway?: GameStructure;
  round: string;
  match: MatchStructure;
  returnMatch?: MatchStructure;
};

export type GameDataDb = {
  id: Id;
  winnerMatch: Id | null;
  loserMatch: Id | null;
  previousMatchHome: Id | null;
  previousMatchAway: Id | null;
  round: string;
  match: MatchDataDb; //convert to json
  returnMatch?: MatchDataDb | null;
};
