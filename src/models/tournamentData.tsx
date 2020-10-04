import { Id } from "../const/structuresConst";
import { Login } from "../const/userConst";

export interface TournamentData {
  id: Id;
  name: string;
  ownerId: Login;
  date: string;
}

export type TournamentCreateData = Omit<TournamentData, "id" | "ownerId">;
