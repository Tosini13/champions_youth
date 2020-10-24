import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { Login } from "../const/userConst";

export interface TournamentData {
  id: Id;
  name: string;
  owner: Login;
  date?: Moment | string;
  time?: Moment | string;
  city?: string;
  address?: string;
  matchTimeInGroup?: number;
  breakTimeInGroup?: number;
  matchTimeInBracket?: number;
  breakTimeInBracket?: number;
  fields: number;
  image?: string;
}

export type TournamentCreateData = Omit<TournamentData, "id" | "owner">;
