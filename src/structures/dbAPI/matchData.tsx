import { Moment } from "moment";
import { matchModeConst } from "../../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";

export class MatchDbApi {
  convertMatchToDb = (match: MatchDataApp) => {
    const matchDb: MatchDataDb = {
      home: match.home?.id ? match.home.id : null,
      away: match.away?.id ? match.away.id : null,
      id: match.id ? match.id : null,
      result: match.result ? match.result : null,
      date: match.date ? match.date : null,
      placeholder: match.placeholder,
      round: match.round,
      mode: match.mode,
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
  id: Id | null;
  home: Id | null;
  away: Id | null;
  placeholder: TeamsPlaceholder;
  result: Result | null;
  round: string;
  mode: matchModeConst;
  date: string | Moment | null;
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
    this.id = matchDataDb.id ? matchDataDb.id : undefined;
    this.placeholder = matchDataDb.placeholder;
    this.result = matchDataDb.result;
    this.round = matchDataDb.round;
    this.date = matchDataDb.date;
    this.mode = matchDataDb.mode;
    if (matchDataDb.home) this.getHome(matchDataDb.home, teams);
    if (matchDataDb.away) this.getAway(matchDataDb.away, teams);
  }
}
