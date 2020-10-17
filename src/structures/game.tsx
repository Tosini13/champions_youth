import { matchModeConst } from "../const/matchConst";
import { Id, TeamsPlaceholder } from "../const/structuresConst";
import { TeamData } from "../models/teamData";
import { MatchStructure } from "./match";
import { TeamStructure } from "./team";

export class GameStructure {
  id: Id;
  winnerMatch?: GameStructure;
  loserMatch?: GameStructure;
  previousMatchHome?: GameStructure;
  previousMatchAway?: GameStructure;
  round: string;
  match: MatchStructure;
  returnMatch?: MatchStructure;
  homeTeam?: TeamData;
  awayTeam?: TeamData;
  placeholder?: TeamsPlaceholder;
  order?: number;

  set setWinnerMatch(winnerMatch: GameStructure) {
    this.winnerMatch = winnerMatch;
  }

  set setLoserMatch(loserMatch: GameStructure) {
    this.loserMatch = loserMatch;
  }

  set setPreviousMatchHome(previousMatchHome: GameStructure) {
    this.previousMatchHome = previousMatchHome;
    this.setHomeString(`${previousMatchHome.round}`);
  }

  set setPreviousMatchAway(previousMatchAway: GameStructure) {
    this.previousMatchAway = previousMatchAway;
    this.setAwayString(`${previousMatchAway.round}`);
  }

  setHomeString = (placeHolder: string) => {
    this.match.placeholder.home = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.away = placeHolder;
    }
  };

  setAwayString = (placeHolder: string) => {
    this.match.placeholder.away = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.home = placeHolder;
    }
  };

  winnerTeam = (match: MatchStructure, returnMatch?: MatchStructure) => {
    if (match.result === undefined) return false;
    let home = match.result.home;
    let away = match.result.away;
    if (returnMatch?.result !== undefined) {
      home += returnMatch.result.away;
      away += returnMatch.result.home;
    }
    const result = home - away;
    if (result > 0) return match.home;
    if (result < 0) return match.away;
    if (result === 0) {
      if (returnMatch?.result !== undefined) {
        if (returnMatch.result.away > match.result.away) return match.home;
        if (returnMatch.result.away < match.result.away) return match.away;
        if (returnMatch.result.away === match.result.away) return false; //temporary
      } else {
        return false; //temporary
      }
    }
  };

  loserTeam = (winnerTeam: TeamStructure | false | undefined) => {
    if (winnerTeam === this.match.home) {
      return this.match.away;
    }
    if (winnerTeam === this.match.away) {
      return this.match.home;
    }
    return false;
  };

  promoteTeam = (team: TeamData | undefined) => {
    if (this.winnerMatch?.previousMatchHome === this) {
      this.winnerMatch.match.setHome(team);
      if (this.winnerMatch.returnMatch) {
        this.winnerMatch.returnMatch.setAway(team);
      }
    }
    if (this.winnerMatch?.previousMatchAway === this) {
      this.winnerMatch.match.setAway(team);
      if (this.winnerMatch.returnMatch) {
        this.winnerMatch.returnMatch.setHome(team);
      }
    }
  };

  demoteTeam = (team: TeamData | undefined) => {
    if (this.loserMatch?.previousMatchHome === this) {
      this.loserMatch.match.setHome(team);
      if (this.loserMatch.returnMatch) {
        this.loserMatch.returnMatch.setAway(team);
      }
    }
    if (this.loserMatch?.previousMatchAway === this) {
      this.loserMatch.match.setAway(team);
      if (this.loserMatch.returnMatch) {
        this.loserMatch.returnMatch.setHome(team);
      }
    }
  };

  isFinished = () => {
    let isFinished = this.match.mode === matchModeConst.finished;
    if (this.returnMatch && isFinished) {
      isFinished = this.returnMatch.mode === matchModeConst.finished;
    }
    if (isFinished && this.match.result) {
      const promoted = this.winnerTeam(this.match, this.returnMatch);
      const demoted = this.loserTeam(promoted);
      if (promoted) {
        this.promoteTeam(promoted);
      } else {
        this.promoteTeam(undefined);
      }
      if (demoted) {
        this.demoteTeam(demoted);
      } else {
        this.demoteTeam(undefined);
      }
    }
    return isFinished;
  };

  constructor(id: Id, round: string, returnMatch: boolean) {
    this.id = id;
    this.round = round;
    this.match = new MatchStructure(this.round);
    if (returnMatch) {
      this.returnMatch = new MatchStructure(`${this.round} - returnMatch`);
    }
  }
}
