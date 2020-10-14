import { Moment } from "moment";
import { matchModeConst } from "../../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";

export class MatchDbApi {
  convertGameToDb = (match: MatchDataApp) => {
    const matchDb: MatchDataDb = {
      ...match,
      home: match.home?.id,
      away: match.away?.id,
    };
    return matchDb;
  };
}

export const matchDbApi = new MatchDbApi();

export type MatchDataApp = {
  id?: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
  date?: string | Moment;
};

export type MatchDataDb = {
  id?: Id;
  home?: Id | null;
  away?: Id | null;
  placeholder: TeamsPlaceholder;
  result?: Result | null;
  round: string;
  mode: matchModeConst;
  date?: string | Moment | null;
};

export class Match {
  id?: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result | null;
  round: string;
  mode: matchModeConst;
  date?: string | Moment | null;

  getHome = (teamId: Id, teams: TeamData[]) => {
    this.home = teams.find((team) => team.id === teamId);
  };

  getAway = (teamId: Id, teams: TeamData[]) => {
    this.away = teams.find((team) => team.id === teamId);
  };

  constructor(matchDataDb: MatchDataDb, teams: TeamData[]) {
    this.id = matchDataDb.id;
    this.placeholder = matchDataDb.placeholder;
    this.result = matchDataDb.result;
    this.round = matchDataDb.round;
    this.date = matchDataDb.date;
    this.mode = matchDataDb.mode;
    if (matchDataDb.home) this.getHome(matchDataDb.home, teams);
    if (matchDataDb.away) this.getAway(matchDataDb.away, teams);
  }
}
