import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import {
  MatchContainerStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundTitleStyled
} from "../../styled/styledMatch";
import GameDetails from "../games/GameDetails";
import tournamentDetailsDict from "../../locale/tournamentDetails";
import ShowTeam from "../matches/ShowTeam";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { Typography } from "@material-ui/core";


const PlayOffsBracketGame = ({ game, locale }) => {
  const [open, setOpen] = React.useState(false);
  const { tournamentId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(game.round);
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        <MatchContainerStyled onClick={handleClickOpen}>
          <MatchHeaderStyled live={false} style={{ justifyContent: 'center' }}>
            <MatchRoundTitleStyled><Translator id={round} /> {number}</MatchRoundTitleStyled>
          </MatchHeaderStyled>
          <MatchMockTeamsContainerStyled>
            <ShowTeam
              team={game.homeTeam}
              placeholder={game?.placeholder?.home}
            />
            <Typography variant="body2">vs</Typography>
            <ShowTeam
              team={game.awayTeam}
              placeholder={game?.placeholder?.away}
            />
          </MatchMockTeamsContainerStyled>
        </MatchContainerStyled>
        {open ? <GameDetails handleClose={handleClose} open={open} tournamentId={tournamentId} gameId={game.id} /> : null}
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(PlayOffsBracketGame);