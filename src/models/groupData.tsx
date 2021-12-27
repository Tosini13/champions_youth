import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { PromotedTeam } from "../NewModels/Team";
import { GroupPlayOffs } from "../store/actions/GroupActions";
import { MatchDataDb } from "../structures/dbAPI/matchData";
import { MatchData } from "../structures/match";
import { TeamData } from "./teamData";

export interface GroupData {
  name: string;
  id?: Id;
  teams: TeamData[];
  matches?: MatchData[];
  promoted: PromotedTeam[];
  finishAt?: Moment;
  promotedQtt?: number;
  teamsQtt?: number;
}

export interface GroupDataDb {
  name: string;
  id?: Id | null;
  teams: Id[];
  promoted: PromotedTeam[];
  finishAt?: string | null;
  promotedQtt?: number | null;
  teamsQtt?: number | null;
  playOffs?: GroupPlayOffs[];
  finished?: boolean;
}

export interface ConvertedGroup {
  groupData: GroupDataDb;
  matchesData?: MatchDataDb[];
}

export class Group {
  name: string;
  id?: Id | null;
  teams: TeamData[] = [];
  promoted: PromotedTeam[];
  finishAt?: string | null;
  promotedQtt?: number | null;
  teamsQtt?: number | null;
  playOffs?: GroupPlayOffs[];
  finished?: boolean;

  getTeams = (teamsId: Id[], teams: TeamData[]) => {
    this.teams = teams.filter((team) => teamsId?.includes(team.id));
  };
  constructor(groupDataDb: GroupDataDb, teams: TeamData[]) {
    this.id = groupDataDb.id;
    this.name = groupDataDb.name;
    this.finishAt = groupDataDb.finishAt;
    this.teamsQtt = groupDataDb.teamsQtt;
    this.promoted = groupDataDb.promoted;
    this.promotedQtt = groupDataDb.promotedQtt;
    this.playOffs = groupDataDb.playOffs;
    this.finished = groupDataDb.finished;
    this.getTeams(groupDataDb.teams, teams);
  }
}
