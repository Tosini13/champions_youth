import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { GameStructure } from "../../structures/game";
import MatchSummaryMock from "../matches/MatchSummaryMock";
import tournamentDetailsDict from "../../locale/tournamentDetails";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";

type Props = {
  game: GameStructure;
  handleOpenTeams: (game: GameStructure) => void;
};
const GameSummaryRecursiveMock: React.FC<Props> = ({
  game,
  handleOpenTeams,
}) => {
  const { locale } = useLocale();
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        <MatchSummaryMock match={game.match} />
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
          <ButtonRC onClick={() => handleOpenTeams(game)}>
            <Translator id="chooseTeams" />
          </ButtonRC>
        ) : null}
      </>
    </Rosetta>
  );
};

export default GameSummaryRecursiveMock;
