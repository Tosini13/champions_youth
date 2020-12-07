import { bergerAlgorithm } from "../algorithms/berger";
import { TeamData } from "../models/teamData";
import { GroupModel } from "../NewModels/Group";

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

const useCreateGroup = () => {
  const initGroupMatches = (
    teams: TeamData[],
    groups: GroupModel[],
    returnGames: boolean
  ) => {
    groups.forEach((group, i) => {
      if (group.teams) {
        const matches = createGroupMatches(group.teams, returnGames);
        matches.sort(compareMatches);
        group.matches = matches;
      }
    });
    // groups = setMatchesTime(tournament, groups);
    return groups;
  };

  return {
    initGroupMatches,
  };
};

export default useCreateGroup;
