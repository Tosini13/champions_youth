import React from "react";
import { LOCALE } from "../../locale/config";
import { Game } from "../../models/gameData";
import GameSummaryContainer from "./gameSummary/GameSummaryContainer";

type Props = {
  playOffs: Game[];
  locale: LOCALE;
  tournamentId: string;
};

const PlayOffsBracket: React.FC<Props> = ({
  playOffs,
  locale,
  tournamentId,
}) => {
  return (
    <>
      {playOffs.map((game) => (
        <React.Fragment key={game.id}>
          <GameSummaryContainer
            game={game}
            locale={locale}
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
