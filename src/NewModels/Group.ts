import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import { TeamData } from "../models/teamData";
import { GroupPlayOffs } from "../store/actions/GroupActions";
import { MatchData } from "../structures/match";
import { NewPlaceholder, PromotedTeam } from "./Team";

export type GroupModel = {
  id: Id;
  name: string;
  teams: TeamData[];
  matches: MatchData[];
  finishAt?: Moment;
  finished?: boolean;
  playOffs?: GroupPlayOffs[];
  promoted?: PromotedTeam[];
  placeholderTeams?: NewPlaceholder[];
};

export type GroupModelDB = {
  id: Id;
  name: string;
  teams: Id[];
  matches: MatchData[];
  finishAt?: Moment;
  finished?: boolean;
  playOffs?: GroupPlayOffs[];
  promoted?: PromotedTeam[];
};
