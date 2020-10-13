import { Moment } from "moment";
import { Id } from "../../const/structuresConst";
import { MatchDataDb } from "./matchData";

export interface GroupDataDb {
  name: string;
  id?: Id | null;
  teams: Id[];
  promoted?: string[] | null;
  finishAt?: string | null;
  promotedQtt?: number | null;
  teamsQtt?: number | null;
}

export interface ConvertedGroup {
  groupData: GroupDataDb;
  matchesData: MatchDataDb[];
}
