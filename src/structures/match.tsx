import { matchModeConst } from "../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../const/structuresConst";
import { Moment } from "moment";
import { TeamData } from "../models/teamData";
import { Placeholder } from "../const/groupConst";

export class MatchStructure {
  id?: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
  date?: Moment;

  setHome = (team: TeamData | undefined) => {
    this.home = team;
  };

  setAway = (team: TeamData | undefined) => {
    this.away = team;
  };

  setHomePlaceholder = (team: Placeholder | undefined) => {
    this.placeholder.home = team;
  };

  setAwayPlaceholder = (team: Placeholder | undefined) => {
    this.placeholder.away = team;
  };

  homeScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.home++;
    }
  };

  awayScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.away++;
    }
  };

  homeResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.home > 0
    ) {
      this.result.home--;
    }
  };

  awayResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.away > 0
    ) {
      this.result.away--;
    }
  };

  finishMatch = () => {
    this.mode = matchModeConst.finished;
  };

  startMatch = () => {
    if (this.home && this.away) {
      this.mode = matchModeConst.live;
      this.result = {
        home: 0,
        away: 0,
      };
    }
  };

  continueMatch = () => {
    this.mode = matchModeConst.live;
    if (!this.result) {
      this.result = {
        home: 0,
        away: 0,
      };
    }
  };

  resetMatch = () => {
    this.mode = matchModeConst.notStarted;
    this.result = undefined;
  };

  constructor(round: string) {
    this.round = round;
    this.placeholder = {
      home: { name: "no team" },
      away: { name: "no team" },
    };
    this.mode = matchModeConst.notStarted;
  }
}

export type MatchData = {
  id: Id;
  home?: TeamData;
  away?: TeamData;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  date?: Moment;
  mode: matchModeConst;
};
