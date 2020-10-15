import moment, { Moment } from "moment";
import { TeamStructure } from "./team";
import { TournamentData } from "../models/tournamentData";
import { TeamData } from "../models/teamData";
import { ConvertedGroup, GroupData, GroupDataDb } from "../models/groupData";
import { MatchDataDb } from "./dbAPI/matchData";

export class GroupStage {
  groups: GroupData[] = [];
  matchCounter: number = 0;

  convertToDb = (groupsData: GroupData[]) => {
    this.groups = groupsData;
    const groupsDb = this.groups.map((group) => {
      const teams = group.teams.map((team) => team.id);
      const matchesData: MatchDataDb[] | undefined = group.matches?.map(
        (match) => {
          return {
            ...match,
            home: match.home?.id,
            away: match.away?.id,
            date: match.date.format(),
          };
        }
      );
      const groupData: GroupDataDb = {
        name: group.name,
        teams,
        finishAt: group.finishAt ? group.finishAt?.format() : null,
        promoted: group.promoted ? group.promoted : null,
        promotedQtt: group.promotedQtt ? group.promotedQtt : null,
        teamsQtt: group.teamsQtt ? group.teamsQtt : null,
      };
      const data: ConvertedGroup = {
        groupData,
        matchesData,
      };
      return data;
    });
    return groupsDb;
  };

  createGroups = (teams: TeamStructure[], groupsQtt: number) => {
    if (teams.length / groupsQtt < 2) {
      return [];
    } else if (groupsQtt < 1) {
      return [];
    }
    let groups: GroupData[] = [];
    const teamsQtt = teams.length;
    let restTeams = 0; //in one group!
    let add = 0;
    if (groupsQtt !== 1) {
      restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
      if (restTeams !== 0) {
        add = 1;
        restTeams--;
      } else {
        add = 0;
      }
      let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
      const groupName = "Grupa " + String.fromCharCode(65 + i);
      const group: GroupData = {
        id: `${i + 1}`,
        name: groupName,
        teamsQtt: teamsInGroup,
        teams: [],
        matches: [],
      };
      groups.push(group);
    }
    this.groups = groups;
    return groups;
  };

  initPromoted(groupName: string, teamsQtt: number) {
    let promoted = [];
    for (let i = 0; i < teamsQtt; i++) {
      promoted[i] = groupName + " - " + (i + 1) + " miejsce";
    }
    return promoted;
  }

  createRandomGroups = (
    teams: TeamStructure[],
    groupsQtt: number,
    tournament: TournamentData,
    returnGames: boolean
  ) => {
    return this.createGroupsAuto(
      this.shuffle(teams),
      groupsQtt,
      tournament,
      returnGames
    );
  };

  shuffle(arr: any[]) {
    let indexes: any[] = [];
    let newArr = [];
    while (indexes.length < arr.length) {
      const j = Math.floor(Math.random() * arr.length);
      if (!indexes.includes(j)) {
        indexes.push(j);
        newArr.push(arr[j]);
      }
    }
    return newArr;
  }

  createGroupsAuto = (
    teams: TeamData[],
    groupsQtt: number,
    tournament: TournamentData,
    returnGames: boolean
  ) => {
    if (teams.length / groupsQtt < 2) {
      return [];
    }
    let leftTeams = [...teams];
    let restTeams = 0; //in one group!
    let add = 0;
    const teamsQtt = teams.length;
    let groups = [];
    if (groupsQtt !== 1) {
      restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
      //check if it will be the same amount of teams or not
      if (restTeams !== 0) {
        add = 1;
        restTeams--;
      } else {
        add = 0;
      }
      let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
      let groupTeams: TeamData[] = [];
      for (let j = 0; j < teamsInGroup; j++) {
        const addedTeam = leftTeams.shift();
        if (addedTeam) {
          groupTeams.push(addedTeam);
        }
      }
      const groupName = "Group " + String.fromCharCode(65 + i);
      const group: GroupData = {
        id: `${i + 1}`,
        name: groupName,
        teams: groupTeams,
        promoted: this.initPromoted(groupName, teamsInGroup),
        matches: [],
      };
      groups.push(group);
    }
    this.initGroupMatches(teams, groups, tournament, returnGames);
    this.groups = groups;
    return groups;
  };

  initGroupMatches = (
    teams: TeamData[],
    groups: GroupData[],
    tournament: TournamentData,
    returnGames: boolean
  ) => {
    groups.forEach((group, i) => {
      if (group.teams) {
        const matches = this.createGroupMatches(group.teams, returnGames);
        matches.sort(this.compareMatches);
        group.matches = matches;
      }
    });
    groups = this.setMatchesTime(tournament, groups);
    return groups;
  };

  compareMatches = (match1: any, match2: any) => {
    return match1.round - match2.round;
  };

  createGroupMatches = (teams: TeamData[], returnGames: boolean) => {
    if (teams.length > 3) {
      return this.bergerAlgorithm(teams, returnGames);
    } else if (teams.length === 3) {
      let matches = [];
      matches.push(this.initMatch(teams[0], teams[1], 1));
      matches.push(this.initMatch(teams[1], teams[2], 2));
      matches.push(this.initMatch(teams[2], teams[0], 3));
      if (returnGames) {
        matches.push(this.initMatch(teams[1], teams[0], 4));
        matches.push(this.initMatch(teams[2], teams[1], 5));
        matches.push(this.initMatch(teams[0], teams[2], 6));
      }
      return matches;
    } else if (teams.length === 2) {
      let matches = [];
      matches.push(this.initMatch(teams[0], teams[1], 1));
      if (returnGames) {
        matches.push(this.initMatch(teams[0], teams[1], 1));
      }
      return matches;
    } else {
      return [];
    }
  };

  bergerAlgorithm = (teams: TeamData[], returnGames: boolean) => {
    const isOdd = Boolean(teams.length % 2);
    const teamsQtt = isOdd ? teams.length + 1 : teams.length;
    const matchesInRound = teamsQtt / 2;
    const ghost = isOdd ? teams[teamsQtt - 2] : teams[teamsQtt - 1];
    let roundsQtt = 1;
    let matches = [];
    let hostTeams = teams.slice(0, teamsQtt / 2).reverse();
    let awayTeams = teams.slice(
      teamsQtt / 2,
      isOdd ? teamsQtt - 2 : teamsQtt - 1
    );
    while (roundsQtt < teamsQtt) {
      let newHost: any = [];
      let newAway: any = [];
      for (let i = 0; i < matchesInRound; i++) {
        let home = null;
        let away = null;
        if (i === 0 && roundsQtt % 2 === 0) {
          away = hostTeams.pop();
          home = ghost;
          newHost.push(away);
        } else if (i === 0 && roundsQtt % 2 === 1) {
          home = hostTeams.pop();
          away = ghost;
          newHost.push(home);
        } else {
          home = hostTeams.pop();
          away = awayTeams.pop();
          newHost.push(away);
          newAway.push(home);
        }
        if (home && away) {
          const match = this.initMatch(home, away, roundsQtt);
          matches.push(match);
        }
      }
      hostTeams = newHost;
      awayTeams = newAway;
      roundsQtt++;
    }
    if (returnGames) {
      roundsQtt--;
      let returnMatches: any[] = [];
      matches.forEach((match) => {
        returnMatches.push(
          this.initMatch(match.away, match.home, match.round + roundsQtt)
        );
      });
      matches = [...matches, ...returnMatches];
    }
    return matches;
  };

  initMatch = (home: TeamStructure, away: TeamStructure, round: number) => {
    return {
      id: ++this.matchCounter,
      home,
      away,
      mode: "NOT_STARTED",
      result: {
        home: 0,
        away: 0,
      },
      round,
    };
  };

  setMatchesTime = (tournament: TournamentData, groups: GroupData[]) => {
    if (
      tournament.matchTimeInGroup === undefined ||
      tournament.breakTimeInGroup === undefined ||
      tournament.matchTimeInBracket === undefined ||
      tournament.breakTimeInBracket === undefined
    ) {
      return groups;
    }
    const timeUnit =
      tournament.matchTimeInBracket + tournament.breakTimeInBracket;
    let timeCounter: Moment = moment(tournament.date);
    let timeTeamsCounter: any[] = [];
    let matchesQtt = 0;
    groups.forEach((group) => {
      if (group.matches && matchesQtt < group.matches.length) {
        matchesQtt = group.matches.length;
      }
    });

    let fieldCounter = 1;
    for (let i = 0; i < matchesQtt + 1; i++) {
      for (let j = 0; j < groups.length; j++) {
        const groupMatches = groups[j].matches;
        if (groupMatches && i < groupMatches.length) {
          if (
            timeTeamsCounter.includes(groupMatches[i].home) ||
            timeTeamsCounter.includes(groupMatches[i].away)
          ) {
            timeCounter = moment(timeCounter).add(timeUnit, "minutes");
            fieldCounter = 1;
            timeTeamsCounter = [];
          }
          groupMatches[i].date = moment(timeCounter);
          timeTeamsCounter = [
            ...timeTeamsCounter,
            groupMatches[i].home,
            groupMatches[i].away,
          ];
          if (!(fieldCounter % tournament.fields)) {
            timeCounter = moment(timeCounter).add(timeUnit, "minutes");
            fieldCounter = 0;
            timeTeamsCounter = [];
          }
          fieldCounter++;
        } else if (groupMatches && i === groupMatches.length && i !== 0) {
          groups[j].finishAt = moment(
            groupMatches[groupMatches.length - 1].date
          ).add(timeUnit, "minutes");
        }
      }
    }
    return groups;
  };
}
