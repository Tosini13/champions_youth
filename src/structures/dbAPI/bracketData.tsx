import { GameStructure } from "../game";
import { GameDataDb, gameDbApi } from "./gameData";

export class BracketDbApi {
  games: GameDataDb[] = []; //unbound games store

  getGamesRecursive = (game: GameStructure) => {
    let games: GameDataDb[] = [];
    games = [...games, gameDbApi.convertGameToDb(game)];
    if (game.previousMatchHome && game.previousMatchHome.loserMatch !== game) {
      const previousHomeGames: GameDataDb[] = this.getGamesRecursive(
        game.previousMatchHome
      );
      games = [...games, ...previousHomeGames];
    }
    if (game.previousMatchAway && game.previousMatchAway.loserMatch !== game) {
      const previousAwayGames: GameDataDb[] = this.getGamesRecursive(
        game.previousMatchAway
      );
      games = [...games, ...previousAwayGames];
    }
    return games;
  };

  convertGames = (placeGames: GameStructure[]) => {
    let gamesDb: GameDataDb[] = [];
    placeGames.forEach((placeGame) => {
      const finalGames = this.getGamesRecursive(placeGame);
      gamesDb = [...gamesDb, ...finalGames];
    });
    return gamesDb;
  };

  convertBracket = (bracket: BracketDataApp) => {
    const bracketDb: BracketDataDb = {
      games: this.convertGames(bracket.placeMatches),
      placeMatchesQtt: bracket.placeMatchesQtt,
      rounds: bracket.rounds,
    };
    return bracketDb;
  };
}

export const bracketDbApi = new BracketDbApi();

export type BracketDataApp = {
  placeMatches: GameStructure[];
  placeMatchesQtt: number;
  rounds: number;
};

export type BracketDataDb = {
  games: GameDataDb[];
  placeMatchesQtt: number;
  rounds: number;
};
