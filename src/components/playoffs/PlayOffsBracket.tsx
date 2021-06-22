import React from "react";
import { Game } from "../../models/gameData";
import {
  GamesContainer,
  GamesItem,
} from "../../styled/styledComponents/playOffs/styledLayout";
import GameSummaryContainer from "./gameSummary/GameSummaryContainer";

type Props = {
  playOffs: Game[];
  tournamentId: string;
};

const PlayOffsBracket: React.FC<Props> = ({ playOffs, tournamentId }) => {
  return (
    <GamesContainer>
      {playOffs.map((game) => (
        <GamesItem key={game.id}>
          <GameSummaryContainer
            game={game}
            tournamentId={tournamentId}
            gameId={game.id}
          />
        </GamesItem>
      ))}
    </GamesContainer>
  );
};

// <PlayOffsBracketGame key={game.id} game={game} />

export default PlayOffsBracket;
