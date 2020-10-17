import { Id, TeamsPlaceholder } from "../const/structuresConst";
import { GameDataDb } from "../structures/dbAPI/gameData";
import { TeamData } from "./teamData";

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

export class Game {
  id: Id | null;
  winnerMatch: Id | null;
  loserMatch: Id | null;
  previousMatchHome: Id | null;
  previousMatchAway: Id | null;
  round: string;
  homeTeam: TeamData | null = null;
  awayTeam: TeamData | null = null;
  // placeholder: TeamsPlaceholder;

  getTeams = (teamsId: Id[], teams: TeamData[]) => {};

  constructor(gameDataDb: GameDataDb, teams: TeamData[]) {
    this.id = gameDataDb.id;
    this.winnerMatch = gameDataDb.winnerMatch;
    this.loserMatch = gameDataDb.loserMatch;
    this.previousMatchHome = gameDataDb.previousMatchHome;
    this.previousMatchAway = gameDataDb.previousMatchAway;
    this.round = gameDataDb.round;
    // this.placeholder = gameDataDb.placeholder;
  }
}
