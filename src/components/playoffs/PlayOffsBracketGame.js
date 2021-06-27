import React from "react";
import { useParams } from "react-router-dom";

import {
  MatchContainerStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundTitleStyled,
} from "../../styled/styledMatch";
import GameDetails from "../games/GameDetails";
import ShowTeam from "../matches/ShowTeam";
import { Typography } from "@material-ui/core";
import { ShowRound } from "../../styled/styledComponents/match/styledTypography";

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
        <MatchHeaderStyled live={false} style={{ justifyContent: "center" }}>
          <MatchRoundTitleStyled>
            <ShowRound round={game.round} />
          </MatchRoundTitleStyled>
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
      {open ? (
        <GameDetails
          handleClose={handleClose}
          open={open}
          tournamentId={tournamentId}
          gameId={game.id}
        />
      ) : null}
    </>
  );
};

export default PlayOffsBracketGame;
