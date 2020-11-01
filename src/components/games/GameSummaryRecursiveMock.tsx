import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { Button } from "@material-ui/core";

import { GameStructure } from "../../structures/game";
import MatchSummaryMock from "../matches/MatchSummaryMock";
import { LOCALE } from "../../locale/config";
import tournamentDetailsDict from "../../locale/tournamentDetails";

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
        <MatchSummaryMock match={game.match} />
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenTeams(game)}
          >
            <Translator id="chooseTeams" />
          </Button>
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
