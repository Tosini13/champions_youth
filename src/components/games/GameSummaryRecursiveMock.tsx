import React from "react";
import { TeamData } from "../../models/teamData";
import { GameStructure } from "../../structures/game";

type Props = {
  game: GameStructure;
  teams: TeamData[];
};
const GameSummaryRecursiveMock: React.FC<Props> = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  const home = game.match.home
    ? game.match.home.name
    : game.match.placeholder.home;
  const away = game.match.away
    ? game.match.away.name
    : game.match.placeholder.away;
  return (
    <>
      <div style={{ color: "white" }}>
        <p>{game.round}</p>
        {home} vs {away}
      </div>
      {/* <MatchSummary match={game.match} teams={teams} /> */}
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursiveMock game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursiveMock game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursiveMock;
