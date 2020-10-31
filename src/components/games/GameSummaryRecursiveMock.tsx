import React from "react";

import { Button } from "@material-ui/core";

import { GameStructure } from "../../structures/game";
import MatchSummaryMock from "../matches/MatchSummaryMock";

type Props = {
  game: GameStructure;
  handleOpenTeams: (game: GameStructure) => void;
};
const GameSummaryRecursiveMock: React.FC<Props> = ({
  game,
  handleOpenTeams,
}) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <MatchSummaryMock match={game.match} />
      {/* <MatchSummary match={game.match} teams={teams} /> */}
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursiveMock
          game={game.previousMatchHome}
          handleOpenTeams={handleOpenTeams}
        />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursiveMock
          game={game.previousMatchAway}
          handleOpenTeams={handleOpenTeams}
        />
      ) : null}
      {game.previousMatchHome === undefined ||
      game.previousMatchAway === undefined ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenTeams(game)}
        >
          Wybierz zespoły
        </Button>
      ) : null}
    </>
  );
};

export default GameSummaryRecursiveMock;
