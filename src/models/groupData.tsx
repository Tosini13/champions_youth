import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { MatchData } from "../structures/match";
import { TeamData } from "./teamData";

export interface GroupData {
  name: string;
  id?: Id;
  teams: TeamData[];
  matches?: MatchData[];
  promoted?: string[];
  finishAt?: Moment;
  promotedQtt?: number;
  teamsQtt?: number;
}

export interface GroupDatabaseData {
  name: string;
  id?: Id;
  teams: Id[];
  matches?: MatchData[];
  promoted?: string[];
  finishAt?: Moment;
  promotedQtt?: number;
  teamsQtt?: number;
}
