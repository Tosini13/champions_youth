import { Moment } from "moment";
import { Id } from "../const/structuresConst";
import {
  GroupRealTeamModel,
  GroupTeamModel,
  TeamData,
} from "../models/teamData";
import { GroupPlayOffs } from "../store/actions/GroupActions";
import { MatchData } from "../structures/match";
import { NewPlaceholder, PromotedTeam } from "./Team";

export type GroupModel = {
  id: Id;
  name: string;
  teams: TeamData[]; // TODO: should be GroupRealTeamModel[]
  groupTeams?: GroupTeamModel[]; // TODO: here should to be kept teams, not in matches
  realTeams?: GroupRealTeamModel[]; // TODO: these should be teams
  matches: MatchData[];
  finishAt?: Moment;
  finished?: boolean;
  playOffs?: GroupPlayOffs[];
  playOffsGroup?: GroupPlayOffsGroup[];
  promoted?: PromotedTeam[];
  placeholderTeams?: NewPlaceholder[];
};

export type GroupModelDB = {
  id: Id;
  name: string;
  teams: Id[];
  groupTeams?: GroupTeamModel[];
  matches: MatchData[];
  finishAt?: Moment;
  finished?: boolean;
  playOffs?: GroupPlayOffs[];
  playOffsGroup?: GroupPlayOffsGroup[];
  promoted?: PromotedTeam[];
};

export type GroupPlayOffsGroup = {
  group: {
    id: Id;
    place: number | string;
  };
  place: number;
};
