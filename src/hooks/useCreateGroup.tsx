import moment, { Moment } from "moment";
import { bergerAlgorithm } from "../algorithms/berger";
import { TeamData } from "../models/teamData";
import { GroupModel } from "../NewModels/Group";
import { MatchTime } from "../NewModels/Matches";

let matchCounter = 0;

export const initMatch = (home: TeamData, away: TeamData, round: number) => {
  return {
    id: ++matchCounter,
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

const compareMatches = (match1: any, match2: any) => {
  return match1.round - match2.round;
};

const createGroupMatches = (teams: TeamData[], returnGames: boolean) => {
  if (teams.length > 3) {
    return bergerAlgorithm(teams, returnGames);
  } else if (teams.length === 3) {
    let matches: any[] = [];
    matches.push(initMatch(teams[0], teams[1], 1));
    matches.push(initMatch(teams[1], teams[2], 2));
    matches.push(initMatch(teams[2], teams[0], 3));
    if (returnGames) {
      matches.push(initMatch(teams[1], teams[0], 4));
      matches.push(initMatch(teams[2], teams[1], 5));
      matches.push(initMatch(teams[0], teams[2], 6));
    }
    return matches;
  } else if (teams.length === 2) {
    let matches: any[] = [];
    matches.push(initMatch(teams[0], teams[1], 1));
    if (returnGames) {
      matches.push(initMatch(teams[0], teams[1], 1));
    }
    return matches;
  } else {
    return [];
  }
};

const setMatchesTime = (time: MatchTime, groups: GroupModel[]) => {
  const fields = 1;
  const matchTime: number = time?.match ? time.match : 0;
  const breakTime: number = time?.break ? time.break : 0;
  const date = "05/10/2020";
  const timeUnit: number = Number(matchTime) + Number(breakTime);
  let timeCounter: Moment = moment(date);
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
        if (!(fieldCounter % fields)) {
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

const useCreateGroup = () => {
  const initGroupMatches = (
    groups: GroupModel[],
    returnGames: boolean,
    time?: MatchTime
  ) => {
    groups.forEach((group, i) => {
      if (group.teams) {
        const matches = createGroupMatches(group.teams, returnGames);
        matches.sort(compareMatches);
        group.matches = matches;
      }
    });
    if (time) {
      groups = setMatchesTime(time, groups);
    }
    return groups;
  };

  return {
    initGroupMatches,
  };
};

export default useCreateGroup;
