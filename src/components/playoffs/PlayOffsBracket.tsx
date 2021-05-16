import React from "react";
import { Game } from "../../models/gameData";
import GameSummaryContainer from "./gameSummary/GameSummaryContainer";

type Props = {
  playOffs: Game[];
  tournamentId: string;
};

const PlayOffsBracket: React.FC<Props> = ({ playOffs, tournamentId }) => {
  return (
    <>
      {playOffs.map((game) => (
        <React.Fragment key={game.id}>
          <GameSummaryContainer
            game={game}
            tournamentId={tournamentId}
            gameId={game.id}
          />
        </React.Fragment>
      ))}
    </>
  );
};

// <PlayOffsBracketGame key={game.id} game={game} />

export default PlayOffsBracket;
