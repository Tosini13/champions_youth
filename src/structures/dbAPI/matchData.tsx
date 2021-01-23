import moment, { Moment } from "moment";
import { matchModeConst } from "../../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
import { GroupModelDB } from "../../NewModels/Group";
import { MatchModelDB } from "../../NewModels/Matches";

export class MatchDbApi {
  convertMatchToDb = (match: MatchDataApp) => {
    const matchDb: MatchDataDb = {
      home: match.home?.id ? match.home.id : null,
      away: match.away?.id ? match.away.id : null,
      id: match.id ? match.id : null,
      result: match.result ? match.result : null,
      date: match.date ? match.date.format() : null,
      placeholder: match.placeholder,
      round: match.round,
      mode: match.mode,
    };
    return matchDb;
  };
}

export const matchDbApi = new MatchDbApi();

export type MatchDataApp = {
  id?: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
  date?: Moment;
};

export type MatchDataDb = {
  id: Id | null;
  home: Id | null;
  away: Id | null;
  placeholder: TeamsPlaceholder;
  result: Result | null;
  round: string;
  mode: matchModeConst;
  date: string | null;
};

export type MatchConstructorType = {
  matchDataDb: MatchModelDB;
  teams: TeamData[];
  groups?: GroupModelDB[];
  playOffsGroup?: GroupModelDB;
};

export class Match {
  id?: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result | null;
  round: string;
  mode: matchModeConst;
  date?: Moment;

  getHome = (teamId: Id, teams: TeamData[]) => {
    this.home = teams.find((team) => team.id === teamId);
  };

  getAway = (teamId: Id, teams: TeamData[]) => {
    this.away = teams.find((team) => team.id === teamId);
  };

  constructor({
    matchDataDb,
    teams,
    groups,
    playOffsGroup,
  }: MatchConstructorType) {
    this.id = matchDataDb.id ? matchDataDb.id : undefined;
    this.placeholder = matchDataDb.placeholder;
    this.result = matchDataDb.result;
    this.round = matchDataDb.round;
    this.date = matchDataDb.date ? moment(matchDataDb.date) : undefined;
    this.mode = matchDataDb.mode;
    if (matchDataDb.home) this.getHome(matchDataDb.home, teams);
    if (matchDataDb.away) this.getAway(matchDataDb.away, teams);
    if (matchDataDb.groupPlaceholder && playOffsGroup) {
      const home = playOffsGroup.groupTeams?.find(
        (team) => team.place === matchDataDb.groupPlaceholder?.home
      );
      const away = playOffsGroup.groupTeams?.find(
        (team) => team.place === matchDataDb.groupPlaceholder?.away
      );
      if (home?.id) this.getHome(home.id, teams);
      if (away?.id) this.getAway(away.id, teams);
      this.placeholder = {
        home: {
          name:
            groups?.find((group) => group.id === home?.group?.id)?.name ??
            `${home?.group?.id}`,
          id: home?.group?.id,
          place: home?.group?.place,
        },
        away: {
          name:
            groups?.find((group) => group.id === away?.group?.id)?.name ??
            `${away?.group?.id}`,
          id: away?.group?.id,
          place: away?.group?.place,
        },
      };
    }
  }
}
