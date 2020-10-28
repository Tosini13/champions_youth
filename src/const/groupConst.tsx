import { Id } from "./structuresConst";

export type PromotedTeam = {
  place: number;
  name: string;
};

export type Placeholder = {
  id: Id;
  place: number;
  name: string;
};


export type PromotedGroupsTeams = [PromotedTeam[]];