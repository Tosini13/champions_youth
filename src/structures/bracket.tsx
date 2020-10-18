import moment, { Moment } from "moment";
import {
  placeMatchesTitle,
  roundMatchesTitle,
  TeamsPlaceholder,
} from "../const/structuresConst";
import { TeamData } from "../models/teamData";
import { BracketDataDb, bracketDbApi } from "./dbAPI/bracketData";
import { GameStructure } from "./game";

export class BracketStructure {
  placeMatches: GameStructure[] = [];
  matchCounter = 1;
  rounds: number;
  placeMatchesQtt: number;
  matchTime = new CountMatchTime();

  setRounds = (rounds: number) => {
    if (this.placeMatchesQtt && rounds * 2 < this.placeMatchesQtt) {
      this.placeMatchesQtt = rounds * 2 - 1;
    }
    this.rounds = rounds;
    this.createBracket();
  };

  setPlaceMatchesQtt = (placeMatchesQtt: number) => {
    if (this.rounds && placeMatchesQtt < this.rounds * 2) {
      this.placeMatchesQtt = placeMatchesQtt;
      this.createBracket();
    }
  };

  createBracket = () => {
    let placeMatch = 1;
    for (
      let matchCounter = 1, smallTitleCounter = 0;
      matchCounter <= this.placeMatchesQtt;
      matchCounter += 2
    ) {
      if (matchCounter !== 1) {
        placeMatch = matchCounter;
        const lastRound = this.countSmallLastRound(matchCounter);
        const lastSmallRound = lastRound / 2;
        if ((matchCounter - 1) % 4 === 0) {
          smallTitleCounter++;
        }
        this.placeMatches[placeMatch] = this.createRound(
          lastRound / 2,
          String.fromCharCode(65 + smallTitleCounter),
          placeMatch
        );
        for (let j = 0; j < lastRound; j++) {
          const linkSmallMatchIndex = Math.floor(j / 2);
          const linkMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch - lastRound],
            lastRound,
            j
          );
          const linkSmallMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch],
            lastSmallRound,
            linkSmallMatchIndex
          );
          linkMatch.setLoserMatch = linkSmallMatch;
          if (j % 2 === 0) {
            linkSmallMatch.setPreviousMatchHome = linkMatch;
          } else {
            linkSmallMatch.setPreviousMatchAway = linkMatch;
          }
        }
      } else {
        this.placeMatches[placeMatch] = this.createRound(this.rounds);
      }
    }
  };

  linkSmallBracket = (
    rootGame: GameStructure,
    totalMatches: number,
    currentMatch: number
  ) => {
    let match = rootGame; //get final
    let roundCounter = totalMatches;
    let partMatches = totalMatches / 2;
    currentMatch++;
    while (
      match.previousMatchHome &&
      match.previousMatchAway &&
      roundCounter > 1
    ) {
      if (currentMatch <= partMatches) {
        match = match.previousMatchHome;
        partMatches = partMatches - roundCounter / 4;
      } else {
        match = match.previousMatchAway;
        partMatches = partMatches + roundCounter / 4;
      }
      roundCounter /= 2;
    }
    return match;
  };

  countSmallLastRound = (placeMatch: number) => {
    let matchPlace = 3;
    for (let multiple = 2; multiple < 64; multiple *= 2) {
      let asc = true;
      matchPlace = multiple + 1;
      for (
        let lastSmallRound = 2, matchCounter = 0;
        matchCounter < multiple / 2;
        matchCounter++, matchPlace += 2
      ) {
        if (matchCounter === 0 && matchPlace === placeMatch) {
          lastSmallRound *= 2;
          return multiple;
        } else if (matchCounter % 2 === 1) {
          if (matchPlace === placeMatch) {
            return 2;
          }
        } else {
          if (lastSmallRound === multiple / 2) asc = false;
          if (matchPlace === placeMatch) {
            return lastSmallRound;
          }
          if (asc) {
            lastSmallRound *= 2;
          }
          if (!asc && lastSmallRound > 2) {
            lastSmallRound /= 2;
          }
        }
      }
    }
    return 2;
  };

  getPlaceRoundTitle = (round: number) => {
    let title = placeMatchesTitle.get(round);
    if (title) return title;
    return `o ${round} miejsce`;
  };

  createRound = (
    lastRound: number,
    smallTitle?: string,
    round: number = 1,
    winnerMatch?: GameStructure,
    matchNo: number = 0
  ) => {
    const returnMatch = false; //temporary
    const match = new GameStructure(
      (this.matchCounter++).toString(),
      `${
        round % 2 === 1
          ? this.getPlaceRoundTitle(round)
          : roundMatchesTitle.get(round)
      }${smallTitle && matchNo ? ` ${smallTitle}` : ""} ${
        matchNo ? ` ${matchNo}` : ""
      }`,
      returnMatch
    );
    if (matchNo !== 0) matchNo = matchNo * 2 - 2;
    if (round !== 1 && round % 2 === 1) round = 1;
    if (winnerMatch) match.setWinnerMatch = winnerMatch;
    if (lastRound > round) {
      match.setPreviousMatchHome = this.createRound(
        lastRound,
        smallTitle,
        round * 2,
        match,
        ++matchNo
      );
      match.setPreviousMatchAway = this.createRound(
        lastRound,
        smallTitle,
        round * 2,
        match,
        ++matchNo
      );
    }
    return match;
  };

  toValidPlaceMatches = (rounds: number, placeMatches: number) => {
    if (placeMatches % 2 === 0) return 1;
    while (rounds * 2 - 1 < placeMatches) {
      placeMatches -= 2;
    }
    return placeMatches;
  };

  getLastMatches = (game: GameStructure) => {
    let games: GameStructure[] = [];
    if (game.previousMatchHome) {
      games = [...this.getLastMatches(game.previousMatchHome), ...games];
    }
    if (game.previousMatchAway) {
      games = [...this.getLastMatches(game.previousMatchAway), ...games];
    }
    if (!(game.previousMatchHome && game.previousMatchAway)) {
      return [...games, game];
    } else {
      return [...games];
    }
  };

  initBracketWithTeams = (teams: TeamData[]) => {
    const lastMatches = this.getLastMatches(this.placeMatches[1]);
    let i = 0;
    lastMatches.forEach((game) => {
      const homeTeam = teams[i++];
      const awayTeam = teams[i++];
      game.homeTeam = homeTeam;
      game.awayTeam = awayTeam;
      game.match.home = homeTeam;
      game.match.away = awayTeam;
    });
  };

  setPlaceholder = (game: GameStructure) => {
    let home = "";
    let away = "";
    if (game.previousMatchHome) home = game.previousMatchHome.round;
    if (game.previousMatchAway) away = game.previousMatchAway.round;
    const placeholder: TeamsPlaceholder = {
      home: home,
      away: away,
    };
    return placeholder;
  };

  breadthFirstSearch = (
    game: GameStructure,
    queue: GameStructure[],
    maxDepth: number,
    depth: number = 0
  ) => {
    if (queue.includes(game) || maxDepth < depth) return false;
    if (maxDepth === depth) {
      //do whatever you want!
      game.placeholder = this.setPlaceholder(game);
      queue.push(game);
      return false;
    }
    if (
      game.previousMatchHome === undefined &&
      game.previousMatchHome === undefined
    )
      return false;
    if (game.previousMatchAway)
      this.breadthFirstSearch(
        game.previousMatchAway,
        queue,
        maxDepth,
        depth + 1
      );
    if (game.previousMatchHome)
      this.breadthFirstSearch(
        game.previousMatchHome,
        queue,
        maxDepth,
        depth + 1
      );
  };

  setGamesData = () => {
    //placeholder and Date
    let games: GameStructure[] = [];
    console.log(games.length, this.matchCounter);
    let i = 0;
    while (games.length < this.matchCounter - 1) {
      let queue: GameStructure[] = [];
      this.placeMatches.forEach((rootMatch) => {
        this.breadthFirstSearch(rootMatch, queue, i);
      });
      games = [...games, ...queue];
      i++;
    }
    games
      .slice()
      .reverse()
      .forEach((game, order) => {
        game.match.date = this.matchTime.nextTime;
        game.order = order + 1;
        if (game.returnMatch?.date)
          game.returnMatch.date = this.matchTime.nextTime;
      });
  };

  convertBracket = () => {
    const bracketDb: BracketDataDb = {
      games: bracketDbApi.convertGames(this.placeMatches),
      placeMatchesQtt: this.placeMatchesQtt,
      rounds: this.rounds,
    };
    return bracketDb;
  };

  constructor(rounds: number, placeMatches: number) {
    this.rounds = rounds;
    this.placeMatchesQtt = this.toValidPlaceMatches(rounds, placeMatches);
    this.createBracket();
    this.setGamesData();
  }
}

export type BracketData = {
  placeMatches: GameStructure[];
  placeMatchesQtt: number;
  rounds: number;
};

export type Options = {
  rounds: number;
  placeMatchesQtt: number;
  roundsActive: boolean;
};

export class CountMatchTime {
  matchTime: number = 6;
  breakTime: number = 2;
  startTime: Moment = moment();
  currentTime: Moment = moment();

  get nextTime() {
    const time = this.currentTime;
    this.currentTime.add(6 + 2, "minutes");
    return time;
  }
}
