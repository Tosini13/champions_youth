import { Id, TeamsPlaceholder } from "../../const/structuresConst";
import { GameStructure } from "../game";
import { MatchStructure } from "../match";
import { matchDbApi, MatchDataDb } from "./matchData";

export class GameDbApi {
  convertGameToDb = (game: GameStructure) => {
    console.log(game);
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
      homeTeam: game.homeTeam ? game.homeTeam.id : null,
      awayTeam: game.awayTeam ? game.awayTeam.id : null,
      placeholder: game.placeholder ? game.placeholder : null,
      order: game.order ? game.order : null,
    };
    console.log(gameDb);
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
  homeTeam: Id | null;
  awayTeam: Id | null;
  placeholder: TeamsPlaceholder | null;
  order: number | null;
};
