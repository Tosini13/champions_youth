import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SportsIcon from "@material-ui/icons/Sports";

import { matchModeConst } from "../../const/matchConst";
import { Match } from "../../structures/dbAPI/matchData";
import { ButtonHorizontalContainerStyled } from "../../styled/styledButtons";

type Props = {
  match: Match;
  gameIsFinished?: () => boolean;
  updateMode: (mode: matchModeConst) => void;
};

const MatchDetailsDashboard: React.FC<Props> = ({
  match,
  gameIsFinished,
  updateMode,
}) => {
  
  const changeMatchMode = () => {
    switch (match.mode) {
      case matchModeConst.live:
        return (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => updateMode(matchModeConst.finished)}
          >
            <SportsIcon /> Finish
          </Button>
        );
      case matchModeConst.finished:
        return (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => updateMode(matchModeConst.notStarted)}
            >
              <SportsIcon /> Reset
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => updateMode(matchModeConst.live)}
            >
              <SportsIcon /> Continue
            </Button>
          </>
        );
      case matchModeConst.notStarted:
        return (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => updateMode(matchModeConst.live)}
          >
            <SportsIcon /> Start
          </Button>
        );
      default:
        console.log("continueMatch");
    }
    if (gameIsFinished) {
      gameIsFinished();
    }
  };

  const handleHomeScore = () => {
    console.log("home scored");
  };
  const handleAwayScore = () => {
    console.log("away scored");
  };
  const handleHomeLose = () => {
    console.log("home lost");
  };
  const handleAwayLose = () => {
    console.log("away lost");
  };

  return (
    <ButtonHorizontalContainerStyled>
      {match.mode === matchModeConst.live ? (
        <>
          <IconButton onClick={handleHomeScore}>+</IconButton>
          <IconButton onClick={handleHomeLose}>-</IconButton>
        </>
      ) : null}
      {changeMatchMode()}
      {match.mode === matchModeConst.live ? (
        <>
          <IconButton onClick={handleAwayLose}>-</IconButton>
          <IconButton onClick={handleAwayScore}>+</IconButton>
        </>
      ) : null}
    </ButtonHorizontalContainerStyled>
  );
};

export default MatchDetailsDashboard;
