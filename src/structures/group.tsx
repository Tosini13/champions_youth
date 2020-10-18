import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { MatchStructure } from "./match";
import { TeamStructure } from "./team";

export class GroupStructure {
  name: string;
  id?: Id;
  teams: TeamStructure[] = [];
  matches: MatchStructure[] = [];
  promoted: string[] = [];
  finishAt?: Moment | string;
  promotedQtt: number = 0;
  teamsQtt?: number;

  constructor(data: GroupStructureData) {
    this.name = data.name;
    this.finishAt = data.finishAt;
    this.teamsQtt = data.teamsQtt;
    if (data.teams) this.teams = data.teams;
    if (data.matches) this.matches = data.matches;
    if (data.promoted) this.promoted = data.promoted;
    if (data.promotedQtt) this.promotedQtt = data.promotedQtt;
    if (data.id) this.id = data.id;
  }
}

export type GroupStructureData = {
  id?: Id;
  name: string;
  teams?: TeamStructure[];
  matches?: MatchStructure[];
  promoted?: string[];
  finishAt?: Moment | string;
  promotedQtt?: number;
  teamsQtt?: number;
};
