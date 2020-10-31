import moment, { Moment } from "moment";
import { TeamStructure } from "./team";
import { Login } from "../const/userConst";
import { Id } from "../const/structuresConst";
import { TournamentCreateData } from "../models/tournamentData";

export class TournamentStructure {
  id?: Id;
  owner: Login;
  date: Moment = moment();
  name: string;
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
  matchPlace?: number;
  matchTimeInGroup?: number;
  breakTimeInGroup?: number;
  matchTimeInBracket?: number;
  breakTimeInBracket?: number;
  fields?: number;
  teams?: TeamStructure[];
};
