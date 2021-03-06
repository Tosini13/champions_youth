import { Moment } from "moment";
import { matchModeConst } from "../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../const/structuresConst";
import { TeamData } from "../models/teamData";

export interface MatchGroupTeamModel {
  place: number | string;
}
export type MatchTime = {
  startDate?: Moment;
  match?: number;
  break?: number;
};

export type MatchModel = {
  id: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  date?: Moment;
  mode: matchModeConst;
  groupPlaceholder?: {
    home: string | number;
    away: string | number;
  };
};

export type MatchModelDB = {
  id: Id;
  home?: Id;
  away?: Id;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  date?: Moment;
  mode: matchModeConst;
  groupPlaceholder?: {
    home: string | number;
    away: string | number;
  };
};
