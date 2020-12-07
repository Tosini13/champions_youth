import { Id } from "../const/structuresConst";

export interface TeamData {
  name: string;
  id: Id;
  logo?: string;
}

export type TeamCreateData = Omit<TeamData, "id">;
