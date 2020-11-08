import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SportsIcon from "@material-ui/icons/Sports";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { matchModeConst } from "../../const/matchConst";
import { Match } from "../../structures/dbAPI/matchData";
import { Grid } from "@material-ui/core";
import { Result } from "../../const/structuresConst";

type Props = {
  match: Match;
  gameIsFinished?: () => boolean;
  updateMode: (mode: matchModeConst) => void;
  updateResult: (result: Result) => void;
  resetMatch: () => void;
  startMatch: () => void;
  finishMatch: () => void;
};

const MatchDetailsDashboard: React.FC<Props> = ({
  match,
  gameIsFinished,
  updateMode,
  updateResult,
  resetMatch,
  startMatch,
  finishMatch,
}) => {
  const changeMatchMode = () => {
    switch (match.mode) {
      case matchModeConst.live:
        return (
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => finishMatch()}
            >
              <SportsIcon /> Finish
            </Button>
          </Grid>
        );
      case matchModeConst.finished:
        return (
          <Grid item xs={12}>
            <Grid container justify="space-evenly" alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => resetMatch()}
                >
                  <SportsIcon /> Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => updateMode(matchModeConst.live)}
                >
                  <SportsIcon /> Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      case matchModeConst.notStarted:
        return (
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => startMatch()}
            >
              <SportsIcon /> Start
            </Button>
          </Grid>
        );
      default:
        console.log("continueMatch");
    }
    if (gameIsFinished) {
      gameIsFinished();
    }
  };

  const handleHomeScore = () => {
    updateResult({
      home: match.result ? match.result.home + 1 : 0,
      away: match.result ? match.result.away : 0,
    });
  };
  const handleAwayScore = () => {
    updateResult({
      home: match.result ? match.result.home : 0,
      away: match.result ? match.result.away + 1 : 0,
    });
  };
  const handleHomeLose = () => {
    updateResult({
      home: match.result ? match.result.home - 1 : 0,
      away: match.result ? match.result.away : 0,
    });
  };
  const handleAwayLose = () => {
    updateResult({
      home: match.result ? match.result.home : 0,
      away: match.result ? match.result.away - 1 : 0,
    });
  };

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      style={{ marginTop: "50px" }}
    >
      {match.mode === matchModeConst.live ? (
        <Grid item>
          <IconButton color="secondary" onClick={handleHomeScore}>
            <AddIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleHomeLose}>
            <RemoveIcon />
          </IconButton>
        </Grid>
      ) : null}
      {changeMatchMode()}
      {match.mode === matchModeConst.live ? (
        <Grid item>
          <IconButton color="secondary" onClick={handleAwayLose}>
            <RemoveIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleAwayScore}>
            <AddIcon />
          </IconButton>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default MatchDetailsDashboard;
