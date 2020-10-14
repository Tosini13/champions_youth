import { Id } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
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
  matchesData?: MatchDataDb[];
}

export class Group {
  name: string;
  id?: Id | null;
  teams: TeamData[] = [];
  promoted?: string[] | null;
  finishAt?: string | null;
  promotedQtt?: number | null;
  teamsQtt?: number | null;

  getTeams = (teamsId: Id[], teams: TeamData[]) => {
    this.teams = teams.filter((team) => teamsId.includes(team.id));
  };

  constructor(groupDataDb: GroupDataDb, teams: TeamData[]) {
    this.id = groupDataDb.id;
    this.name = groupDataDb.name;
    this.finishAt = groupDataDb.finishAt;
    this.teamsQtt = groupDataDb.teamsQtt;
    this.promoted = groupDataDb.promoted;
    this.promotedQtt = groupDataDb.promotedQtt;
    this.getTeams(groupDataDb.teams, teams);
  }
}
