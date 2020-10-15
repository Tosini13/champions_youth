import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";

import { matchModeConst } from "../../const/matchConst";
import { MatchData } from "../../structures/match";

type Props = {
  match: MatchData;
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
    <DialogActions>
      {match.mode === matchModeConst.notStarted ? (
        <Button onClick={() => changeMatchMode(matchModeConst.live)}>
          Start
        </Button>
      ) : null}

      {match.mode === matchModeConst.live ? (
        <>
          <IconButton onClick={handleHomeScore}>+</IconButton>
          <IconButton onClick={handleHomeLose}>-</IconButton>
          <Button onClick={() => changeMatchMode(matchModeConst.finished)}>
            Finish
          </Button>
          <IconButton onClick={handleAwayLose}>-</IconButton>
          <IconButton onClick={handleAwayScore}>+</IconButton>
        </>
      ) : null}

      {match.mode === matchModeConst.finished ? (
        <>
          <Button onClick={() => changeMatchMode(matchModeConst.live)}>
            Continue
          </Button>
          <Button onClick={() => changeMatchMode(matchModeConst.notStarted)}>
            Reset
          </Button>
        </>
      ) : null}
    </DialogActions>
  );
};

export default MatchDetailsDashboard;
