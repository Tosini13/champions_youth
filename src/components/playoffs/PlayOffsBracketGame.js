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
          <p>{game.homeTeam ? game.homeTeam.name : game.placeholder.home ? game.placeholder.home.name : 'brak zespołu'}</p>
          <p>vs</p>
          <p>{game.awayTeam ? game.awayTeam.name : game.placeholder.away ? game.placeholder.away.name : 'brak zespołu'}</p>
        </MatchMockTeamsContainerStyled>
      </MatchContainerStyled>
      {open ? <GameDetails handleClose={handleClose} open={open} tournamentId={tournamentId} gameId={game.id} /> : null}

    </>
  );
};

export default PlayOffsBracketGame;