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
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
  date?: string | Moment;
};

export type MatchDataDb = {
  home?: Id | null;
  away?: Id | null;
  placeholder: TeamsPlaceholder;
  result?: Result | null;
  round: string;
  mode: matchModeConst;
  date?: string | Moment | null;
};
