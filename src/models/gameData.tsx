import { Id, TeamsPlaceholder } from "../const/structuresConst";
import { GameDataDb } from "../structures/dbAPI/gameData";
import { TeamData } from "./teamData";

export interface GameData {
  id: Id;
  match: Id;
  returnMatch: Id | null;
  winnerGame: Id | null;
  loserGame: Id | null;
  previousGameHome: Id | null;
  previousGameAway: Id | null;
  roundName: string;
  homeTeam: TeamData | null;
  awayTeam: TeamData | null;
  placeholder: TeamsPlaceholder | null;
}

export class Game {
  id: Id;
  winnerMatch: Id | null;
  loserMatch: Id | null;
  previousMatchHome: Id | null;
  previousMatchAway: Id | null;
  round: string;
  homeTeam: TeamData | null = null;
  awayTeam: TeamData | null = null;
  placeholder: TeamsPlaceholder | null;
  order: number | null;

  setHomeTeam = (teamId: Id, teams: TeamData[]) => {
    const homeTeam = teams.find((team) => team.id === teamId);
    this.homeTeam = homeTeam ? homeTeam : null;
  };

  setAwayTeam = (teamId: Id, teams: TeamData[]) => {
    const awayTeam = teams.find((team) => team.id === teamId);
    this.awayTeam = awayTeam ? awayTeam : null;
  };

  constructor(gameDataDb: GameDataDb, teams: TeamData[]) {
    this.id = gameDataDb.id;
    this.winnerMatch = gameDataDb.winnerMatch;
    this.loserMatch = gameDataDb.loserMatch;
    this.previousMatchHome = gameDataDb.previousMatchHome;
    this.previousMatchAway = gameDataDb.previousMatchAway;
    this.round = gameDataDb.round;
    this.placeholder = gameDataDb.placeholder;
    this.order = gameDataDb.order;
    if (gameDataDb.homeTeam) this.setHomeTeam(gameDataDb.homeTeam, teams);
    if (gameDataDb.awayTeam) this.setAwayTeam(gameDataDb.awayTeam, teams);
  }
}
