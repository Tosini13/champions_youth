import { Id } from "../const/structuresConst";
import { TeamData } from "../models/teamData";
import { MatchData } from "../structures/match";

export type GroupModel = {
  id: Id;
  name: string;
  teams: TeamData[];
  matches?: MatchData[];
};
