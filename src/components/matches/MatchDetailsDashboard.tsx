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
};

const MatchDetailsDashboard: React.FC<Props> = ({ match, gameIsFinished }) => {
  const changeMatchMode = (mode: matchModeConst) => {
    switch (mode) {
      case matchModeConst.live:
        if (match.mode === matchModeConst.finished) {
          console.log("continue");
        } else {
          console.log("startMatch");
        }
        break;
      case matchModeConst.finished:
        console.log("finishMatch");
        break;
      case matchModeConst.notStarted:
        console.log("resetMatch");
        break;
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
    <div>
      {match.mode === matchModeConst.notStarted ? (
        <ButtonHorizontalContainerStyled>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => changeMatchMode(matchModeConst.live)}
          >
            <SportsIcon /> Rozpocznij
          </Button>
        </ButtonHorizontalContainerStyled>
      ) : null}

      {match.mode === matchModeConst.live ? (
        <>
          <IconButton onClick={handleHomeScore}>+</IconButton>
          <IconButton onClick={handleHomeLose}>-</IconButton>
          <Button onClick={() => changeMatchMode(matchModeConst.finished)}>
          <SportsIcon /> Zakończ
          </Button>
          <IconButton onClick={handleAwayLose}>-</IconButton>
          <IconButton onClick={handleAwayScore}>+</IconButton>
        </>
      ) : null}

      {match.mode === matchModeConst.finished ? (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => changeMatchMode(matchModeConst.live)}
          >
            <SportsIcon /> Wznów
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => changeMatchMode(matchModeConst.notStarted)}
          >
            <SportsIcon /> Zresetuj
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default MatchDetailsDashboard;
