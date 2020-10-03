import { Id } from "../const/structuresConst";

export interface TeamData {
  name: string;
  id: Id;
}

export type TeamCreateData = Omit<TeamData, "id">;
