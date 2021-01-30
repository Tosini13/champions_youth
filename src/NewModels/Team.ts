import { Id } from "../const/structuresConst";

export type PromotedTeam = {
  place: number;
  name: string;
};

export type Placeholder = {
  id?: Id;
  place?: number | string;
  name: string;
};

export type NewPlaceholder = {
  id: Id;
  place: number | string;
};

export type PromotedGroupsTeams = [PromotedTeam[]];
