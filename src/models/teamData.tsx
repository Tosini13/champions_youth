import { Id } from "../const/structuresConst";

export interface TeamData {
  name: string;
  id: Id;
  logo?: string;
}

export type TeamCreateData = Omit<TeamData, "id">;

export interface GroupTeamModel {
  place: number | string; // place in current group
  id?: Id; // id of the team if already chosen
  group?: {
    id: Id; // id of previous group
    place: number | string; // place in previous group
  };
}

export interface GroupRealTeamModel {
  place: number | string; // place in current group
  id?: Id; // id of the team if already chosen
}
