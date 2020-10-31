import React from "react";
import { GameStructure } from "../../structures/game";
import { TeamData } from "../../models/teamData";
import MatchSummary from "../matches/MatchSummary";
import MatchSummaryMock from "../matches/MatchSummaryMock";

type Props = {
  game: GameStructure;
  teams: TeamData[];
};
const GameSummaryRecursive: React.FC<Props> = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      {game.match.home?.name} vs {game.match.away?.name}
      {/* <MatchSummary match={game.match} teams={teams} game={game} /> */}
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursive game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursive game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
