import React from "react";

import { Button } from "@material-ui/core";

import { TeamData } from "../../models/teamData";
import { GameStructure } from "../../structures/game";
import MatchSummaryMock from "../matches/MatchSummaryMock";

type Props = {
  game: GameStructure;
  teams: TeamData[];
  handleOpenTeams: (game: GameStructure) => void;
};
const GameSummaryRecursiveMock: React.FC<Props> = ({
  game,
  teams,
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
          teams={teams}
          handleOpenTeams={handleOpenTeams}
        />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursiveMock
          game={game.previousMatchAway}
          teams={teams}
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
