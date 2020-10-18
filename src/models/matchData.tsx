import moment, { Moment } from "moment";
import { matchModeConst } from "../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../const/structuresConst";
import { MatchDataDb } from "../structures/dbAPI/matchData";
import { TeamData } from "./teamData";

export interface GameData {
  id: Id;
  home: Id | null;
  away: Id | null;
  placeholder: TeamsPlaceholder;
  result: Result | null;
  round: string;
  mode: matchModeConst;
}

export class Match {
  id: Id | null;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result: Result | null;
  round: string;
  mode: matchModeConst;
  date?: Moment;

  setHomeTeam = (teamId: Id, teams: TeamData[]) => {
    const homeTeam = teams.find((team) => team.id === teamId);
    this.home = homeTeam;
  };

  setAwayTeam = (teamId: Id, teams: TeamData[]) => {
    const awayTeam = teams.find((team) => team.id === teamId);
    this.away = awayTeam;
  };

  constructor(matchDataDb: MatchDataDb, teams: TeamData[]) {
    this.id = matchDataDb.id;
    this.placeholder = matchDataDb.placeholder;
    this.result = matchDataDb.result;
    this.round = matchDataDb.round;
    this.mode = matchDataDb.mode;
    this.date = matchDataDb.date ? moment(matchDataDb.date) : undefined;
    if (matchDataDb.home) this.setHomeTeam(matchDataDb.home, teams);
    if (matchDataDb.away) this.setAwayTeam(matchDataDb.away, teams);
  }
}
