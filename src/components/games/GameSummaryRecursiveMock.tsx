import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { GameStructure } from "../../structures/game";
import { LOCALE } from "../../locale/config";
import tournamentDetailsDict from "../../locale/tournamentDetails";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import MatchSummary from "../matches/MatchSummary/MatchSummary";
import { convertMatchStructureToData } from "../../structures/match";

type Props = {
  game: GameStructure;
  handleOpenTeams: (game: GameStructure) => void;
  locale: LOCALE;
};
const GameSummaryRecursiveMock: React.FC<Props> = ({
  game,
  handleOpenTeams,
  locale,
}) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        <MatchSummary
          match={convertMatchStructureToData(game.match)}
          locale={locale}
        />
        {!lastMatch && game.previousMatchHome ? (
          <GameSummaryRecursiveMock
            game={game.previousMatchHome}
            handleOpenTeams={handleOpenTeams}
            locale={locale}
          />
        ) : null}
        {!lastMatch && game.previousMatchAway ? (
          <GameSummaryRecursiveMock
            game={game.previousMatchAway}
            handleOpenTeams={handleOpenTeams}
            locale={locale}
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(GameSummaryRecursiveMock);
