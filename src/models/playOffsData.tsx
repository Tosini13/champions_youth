import { Id } from "../const/structuresConst";

export interface PlayOffsData {
  placeGames: Id[];
  placeGamesQtt: number;
  rounds: number;
};

export type Options = {
  rounds: number;
  placeMatchesQtt: number;
  roundsActive: boolean;
};
