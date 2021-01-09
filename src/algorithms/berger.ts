import { TeamData } from "../models/teamData";
import { MatchModel } from "../NewModels/Matches";
import { NewPlaceholder } from "../NewModels/Team";

export const bergerAlgorithm = (
  teams: TeamData[] | NewPlaceholder[],
  returnGames: boolean,
  initMatch: (home: any, away: any, round: number) => MatchModel
) => {
  const isOdd = Boolean(teams.length % 2);
  const teamsQtt = isOdd ? teams.length + 1 : teams.length;
  const matchesInRound = teamsQtt / 2;
  const ghost = isOdd ? teams[teamsQtt - 2] : teams[teamsQtt - 1];
  let roundsQtt = 1;
  let matches: any = [];
  let hostTeams = teams.slice(0, teamsQtt / 2).reverse();
  let awayTeams = teams.slice(
    teamsQtt / 2,
    isOdd ? teamsQtt - 2 : teamsQtt - 1
  );
  while (roundsQtt < teamsQtt) {
    let newHost: any = [];
    let newAway: any = [];
    for (let i = 0; i < matchesInRound; i++) {
      let home: any = null;
      let away: any = null;
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
        const match = initMatch(home, away, roundsQtt);
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
        initMatch(match.away, match.home, match.round + roundsQtt)
      );
    });
    matches = [...matches, ...returnMatches];
  }
  return matches;
};
