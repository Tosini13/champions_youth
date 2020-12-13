import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { Login } from "../const/userConst";

export interface TournamentModel {
  id: Id;
  name: string;
  ownerId: Login;
  date?: string;
  time?: string;
  city?: string;
  address?: string;
  matchTimeInGroup?: number;
  breakTimeInGroup?: number;
  matchTimeInBracket?: number;
  breakTimeInBracket?: number;
  fields: number;
  image?: string;
}

export type TournamentCreateData = Omit<TournamentModel, "id" | "ownerId">;
