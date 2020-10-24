import React from "react";
import { useParams } from "react-router-dom";
import {
  MatchContainerStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundTitleStyled
} from "../../styled/styledMatch";
import GameDetails from "../games/GameDetails";


const PlayOffsBracketGame = ({ game }) => {
  const [open, setOpen] = React.useState(false);
  const { tournamentId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MatchContainerStyled onClick={handleClickOpen}>
        <MatchHeaderStyled live={false} style={{ justifyContent: 'center' }}>
          <MatchRoundTitleStyled>{game.round}</MatchRoundTitleStyled>
        </MatchHeaderStyled>
        <MatchMockTeamsContainerStyled>
          <p>{game.homeTeam ? game.homeTeam.name : game.placeholder?.home}</p>
          <p>vs</p>
          <p>{game.awayTeam ? game.awayTeam.name : game.placeholder?.away}</p>
        </MatchMockTeamsContainerStyled>
      </MatchContainerStyled>
      {open ? <GameDetails handleClose={handleClose} open={open} tournamentId={tournamentId} gameId={game.id} /> : null}

    </>
  );
};

export default PlayOffsBracketGame;

/*import React from "react";
import { Link, useParams } from "react-router-dom";
import { routerGenerateConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";

import { Game } from "../../models/gameData";
import { LinkStyled } from "../../styled/styledLayout";
import {
  MatchContainerStyled,
  MatchMockTeamsContainerStyled,
  MatchRoundTitleStyled,
} from "../../styled/styledMatch";

type Props = {
  game: Game;
};

const PlayOffsBracketGame: React.FC<Props> = ({ game }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  return (
    <LinkStyled to={routerGenerateConst.bracket(tournamentId, game.id)}>
      <MatchContainerStyled>
        <MatchRoundTitleStyled live={false}>{game.round}</MatchRoundTitleStyled>
        <MatchMockTeamsContainerStyled>
          <p>{game.homeTeam ? game.homeTeam.name : game.placeholder?.home}</p>
          <p>vs</p>
          <p>{game.awayTeam ? game.awayTeam.name : game.placeholder?.away}</p>
        </MatchMockTeamsContainerStyled>
      </MatchContainerStyled>
    </LinkStyled>
  );
};

export default PlayOffsBracketGame;
*/
