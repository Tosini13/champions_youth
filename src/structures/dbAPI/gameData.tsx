import { Id } from "../../const/structuresConst";
import { GameStructure } from "../game";
import { MatchStructure } from "../match";
import { matchDbApi, MatchDataDb } from "./matchData";

export class GameDbApi {
  convertGameToDb = (game: GameDataApp) => {
    const gameDb: GameDataDb = {
      id: game.id,
      winnerMatch: game.winnerMatch?.id,
      loserMatch: game.loserMatch?.id,
      previousMatchHome: game.previousMatchHome?.id,
      previousMatchAway: game.previousMatchAway?.id,
      round: game.round,
      match: matchDbApi.convertGameToDb(game.match),
      returnMatch: game.returnMatch
        ? matchDbApi.convertGameToDb(game.returnMatch)
        : game.returnMatch,
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
  winnerMatch?: Id;
  loserMatch?: Id;
  previousMatchHome?: Id;
  previousMatchAway?: Id;
  round: string;
  match: MatchDataDb; //convert to json
  returnMatch?: MatchDataDb;
};
