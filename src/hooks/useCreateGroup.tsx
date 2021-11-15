import moment, { Moment } from "moment";
import { bergerAlgorithm, bergerAlgorithmPlace } from "../algorithms/berger";
import { GroupTeamModel, TeamData } from "../models/teamData";
import { GroupModel } from "../NewModels/Group";
import { MatchTime } from "../NewModels/Matches";
import { NewPlaceholder } from "../NewModels/Team";
import { MatchModel } from "../NewModels/Matches";
import { matchModeConst } from "../const/matchConst";
import { TBreak } from "../components/groups/creation/settings/GroupsSettingsTimeBreak";

let matchCounter = 0;

export const initPlaceholderMatch = (
  home: NewPlaceholder,
  away: NewPlaceholder,
  round: number
) => {
  const match: MatchModel = {
    id: (++matchCounter).toString(),
    mode: matchModeConst.notStarted,
    round: round.toString(),
    placeholder: {
      home: {
        id: home.id,
        name: home.id, // todo: real group name
        place: home.place,
      },
      away: {
        id: away.id,
        name: away.id, // todo: real group name
        place: away.place,
      },
    },
  };
  return match;
};

export const initMatch = (home: TeamData, away: TeamData, round: number) => {
  const match: MatchModel = {
    id: (++matchCounter).toString(),
    home,
    away,
    mode: matchModeConst.notStarted,
    round: round.toString(),
    placeholder: {},
  };
  return match;
};

export const initMatchPlace = (
  home: GroupTeamModel,
  away: GroupTeamModel,
  round: number
) => {
  const match: MatchModel = {
    id: (++matchCounter).toString(),
    mode: matchModeConst.notStarted,
    round: round.toString(),
    placeholder: {},
    groupPlaceholder: {
      home: home.place,
      away: away.place,
    },
  };
  return match;
};

const compareMatches = (match1: any, match2: any) => {
  return match1.round - match2.round;
};

const createGroupMatches = (teams: TeamData[], returnGames: boolean) => {
  if (teams.length > 3) {
    return bergerAlgorithm(teams, returnGames, initMatch);
  } else if (teams.length === 3) {
    let matches: MatchModel[] = [];
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
    let matches: MatchModel[] = [];
    matches.push(initMatch(teams[0], teams[1], 1));
    if (returnGames) {
      matches.push(initMatch(teams[1], teams[0], 2));
    }
    return matches;
  } else {
    return [];
  }
};

const createGroupPlaceMatches = (
  teams: GroupTeamModel[],
  returnGames: boolean
) => {
  if (teams.length > 3) {
    return bergerAlgorithmPlace(teams, returnGames, initMatchPlace);
  } else if (teams.length === 3) {
    let matches: MatchModel[] = [];
    matches.push(initMatchPlace(teams[0], teams[1], 1));
    matches.push(initMatchPlace(teams[1], teams[2], 2));
    matches.push(initMatchPlace(teams[2], teams[0], 3));
    if (returnGames) {
      matches.push(initMatchPlace(teams[1], teams[0], 4));
      matches.push(initMatchPlace(teams[2], teams[1], 5));
      matches.push(initMatchPlace(teams[0], teams[2], 6));
    }
    return matches;
  } else if (teams.length === 2) {
    let matches: any[] = [];
    matches.push(initMatchPlace(teams[0], teams[1], 1));
    if (returnGames) {
      matches.push(initMatchPlace(teams[0], teams[1], 1));
    }
    return matches;
  } else {
    return [];
  }
};

const createGroupPlaceholderMatches = (
  placeholderTeams: NewPlaceholder[],
  returnGames: boolean
) => {
  if (placeholderTeams.length > 3) {
    return bergerAlgorithm(placeholderTeams, returnGames, initPlaceholderMatch);
  } else if (placeholderTeams.length === 3) {
    let matches: MatchModel[] = [];
    matches.push(
      initPlaceholderMatch(placeholderTeams[0], placeholderTeams[1], 1)
    );
    matches.push(
      initPlaceholderMatch(placeholderTeams[1], placeholderTeams[2], 2)
    );
    matches.push(
      initPlaceholderMatch(placeholderTeams[2], placeholderTeams[0], 3)
    );
    if (returnGames) {
      matches.push(
        initPlaceholderMatch(placeholderTeams[1], placeholderTeams[0], 4)
      );
      matches.push(
        initPlaceholderMatch(placeholderTeams[2], placeholderTeams[1], 5)
      );
      matches.push(
        initPlaceholderMatch(placeholderTeams[0], placeholderTeams[2], 6)
      );
    }
    return matches;
  } else if (placeholderTeams.length === 2) {
    let matches: any[] = [];
    matches.push(
      initPlaceholderMatch(placeholderTeams[0], placeholderTeams[1], 1)
    );
    if (returnGames) {
      matches.push(
        initPlaceholderMatch(placeholderTeams[0], placeholderTeams[1], 1)
      );
    }
    return matches;
  } else {
    return [];
  }
};

const getNextDate = (
  date: Moment,
  timeBreaks: TBreak[]
): {
  date: Moment;
  timeBreaks: TBreak[];
} => {
  if (timeBreaks.length === 0) {
    return { date, timeBreaks };
  }
  if (date.isAfter(timeBreaks[0].startDate)) {
    return getNextDate(moment(timeBreaks[0].endDate), timeBreaks.slice(1));
  }
  return {
    date,
    timeBreaks,
  };
};

const setMatchesTime = (
  time: MatchTime,
  groups: GroupModel[],
  fields: number,
  date: string,
  timeBreaks: TBreak[]
) => {
  const matchTime: number = time?.match ? time.match : 0;
  const breakTime: number = time?.break ? time.break : 0;
  const timeUnit: number = Number(matchTime) + Number(breakTime);
  let { date: timeCounter, timeBreaks: breaks } = getNextDate(
    moment(date),
    timeBreaks
  );

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
      const nextDate = getNextDate(
        moment(timeCounter).add(timeUnit, "minutes"),
        breaks
      );
      timeCounter = nextDate.date;
      breaks = nextDate.timeBreaks;
      const groupMatches = groups[j].matches;
      if (groupMatches && i < groupMatches.length) {
        const home =
          groupMatches[i].home ??
          groupMatches[i].placeholder.home ??
          `${groupMatches[i].id}${groupMatches[i].groupPlaceholder?.home}`;
        const away =
          groupMatches[i].away ??
          groupMatches[i].placeholder.away ??
          `${groupMatches[i].id}${groupMatches[i].groupPlaceholder?.away}`;
        if (
          timeTeamsCounter.includes(home) ||
          timeTeamsCounter.includes(away)
        ) {
          timeCounter = moment(timeCounter).add(timeUnit, "minutes");
          fieldCounter = 1;
          timeTeamsCounter = [];
        }
        groupMatches[i].date = moment(timeCounter);
        timeTeamsCounter = [...timeTeamsCounter, home, away];

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
  const initGroupMatches = ({
    groups,
    returnMatches,
    fields,
    time,
    date,
    timeBreaks,
  }: {
    groups: GroupModel[];
    returnMatches: boolean;
    fields: number;
    time?: MatchTime;
    date?: string;
    timeBreaks: TBreak[];
  }) => {
    groups.forEach((group, i) => {
      if (group.groupTeams?.length) {
        const matches = createGroupPlaceMatches(
          group.groupTeams,
          returnMatches
        );
        matches.sort(compareMatches);
        group.matches = matches;
      } else if (group.placeholderTeams?.length) {
        const matches = createGroupPlaceholderMatches(
          group.placeholderTeams,
          returnMatches
        );
        matches.sort(compareMatches);
        group.matches = matches;
      } else if (group.teams) {
        const matches = createGroupMatches(group.teams, returnMatches);
        matches.sort(compareMatches);
        group.matches = matches;
      }
    });
    if (time && date) {
      groups = setMatchesTime(time, groups, fields, date, timeBreaks);
    }
    return groups;
  };

  return {
    initGroupMatches,
  };
};

export default useCreateGroup;
