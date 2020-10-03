import { Id } from "../const/structuresConst";

export interface GameData {
  id: Id;
  match: Id;
  returnMatch: Id;
  winnerGame: Id | null;
  loserGame: Id | null;
  previousGameHome: Id | null;
  previousGameAway: Id | null;
  roundName: string;
}
