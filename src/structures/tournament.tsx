import moment, { Moment } from "moment";
import { bracketDbApi } from "./dbAPI/bracketData";
import { BracketStructure } from "./bracket";
import { TeamStructure } from "./team";
import { Login } from "../const/userConst";
import { Id } from "../const/structuresConst";
import { TournamentCreateData } from "../models/tournamentData";
import { GroupStage } from "./groupStage";

export class TournamentStructure {
  id?: Id;
  owner: Login;
  date: Moment = moment();
  name: string;
  bracket?: BracketStructure;
  groupStage?: GroupStage;
  teams: TeamStructure[] = [];
  matchTimeInGroup?: number = 5;
  breakTimeInGroup?: number = 1;
  matchTimeInBracket?: number = 6;
  breakTimeInBracket?: number = 2;
  fields: number = 3;

  addTeam = (team: TeamStructure) => {
    this.teams = [...this.teams, team];
  };

  deleteTeam = (teamToDelete: TeamStructure) => {
    const teams = this.teams.filter((team) => team.id !== teamToDelete.id);
    this.teams = [...teams];
  };

  editTeam = (teamToEdit: TeamStructure) => {
    this.teams.forEach((team) => {
      if (team.id === teamToEdit.id) {
        team = teamToEdit;
      }
    });
  };

  deleteGroups = () => {
    this.groupStage = undefined;
  };

  deletePlayOffs = () => {
    this.bracket = undefined;
  };

  createBracket = (rounds: number, placeMatchesQtt: number) => {
    this.bracket = new BracketStructure(rounds, placeMatchesQtt);
  };

  convertBracket = () => {
    if (this.bracket) {
      return bracketDbApi.convertBracket(this.bracket);
    }
  };

  convert = () => {
    const convertedTournament: TournamentCreateData = {
      name: this.name,
      date: moment(this.date).format(),
      fields: this.fields,
    };
    return convertedTournament;
  };

  constructor(tournament: TournamentStructureData) {
    this.name = tournament.name;
    this.owner = tournament.owner;
  }
}

export type TournamentStructureData = {
  name: string;
  owner: Login;
  bracket?: BracketStructure;
  rounds?: number;
  matchPlace?: number;
  matchTimeInGroup?: number;
  breakTimeInGroup?: number;
  matchTimeInBracket?: number;
  breakTimeInBracket?: number;
  fields?: number;
  teams?: TeamStructure[];
};
