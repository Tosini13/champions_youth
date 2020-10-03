import moment from "moment";
import { bracketDbApi } from "./dbAPI/bracketData";
import { BracketStructure } from "./bracket";
import { TeamStructure } from "./team";
import { GroupStructure } from "./group";
import { Login } from "../const/userConst";
import { Id } from "../const/structuresConst";
import { TournamentCreateData } from "../models/tournamentData";

export class TournamentStructure {
  id?: Id;
  owner: Login;
  date: string = moment().format();
  name: string;
  bracket?: BracketStructure;
  groups?: GroupStructure[];
  teams: TeamStructure[] = [];

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
      date: this.date,
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
};
