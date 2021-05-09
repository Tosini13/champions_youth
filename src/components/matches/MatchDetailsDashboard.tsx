import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import IconButton from "@material-ui/core/IconButton";
import { Sports, Add, Remove } from "@material-ui/icons";

import { matchModeConst } from "../../const/matchConst";
import { Match } from "../../structures/dbAPI/matchData";
import { Grid } from "@material-ui/core";
import { Result } from "../../const/structuresConst";
import matchDict from "../../locale/matchDict";
import { LOCALE } from "../../locale/config";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";

type Props = {
  locale: LOCALE;
  match: Match;
  gameIsFinished?: () => boolean;
  updateMode: (mode: matchModeConst) => void;
  updateResult: (result: Result) => void;
  resetMatch: () => void;
  startMatch: () => void;
  finishMatch: () => void;
};

const MatchDetailsDashboard: React.FC<Props> = ({
  locale,
  match,
  gameIsFinished,
  updateMode,
  updateResult,
  resetMatch,
  startMatch,
  finishMatch,
}) => {
  console.log(locale);

  const changeMatchMode = () => {
    switch (match.mode) {
      case matchModeConst.live:
        return (
          <Grid item>
            <ButtonRC onClick={() => finishMatch()}>
              <Sports /> <Translator id="finish" />
            </ButtonRC>
          </Grid>
        );
      case matchModeConst.finished:
        return (
          <Grid item xs={12}>
            <Grid container justify="space-evenly" alignItems="center">
              <Grid item>
                <ButtonRC onClick={() => resetMatch()}>
                  <Sports /> <Translator id="reset" />
                </ButtonRC>
              </Grid>
              <Grid item>
                <ButtonRC onClick={() => updateMode(matchModeConst.live)}>
                  <Sports /> <Translator id="continue" />
                </ButtonRC>
              </Grid>
            </Grid>
          </Grid>
        );
      case matchModeConst.notStarted:
        return (
          <Grid item>
            <ButtonRC onClick={() => startMatch()}>
              <Sports /> <Translator id="start" />
            </ButtonRC>
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
    <Rosetta translations={matchDict} locale={locale}>
      <Grid
        container
        justify="space-evenly"
        alignItems="center"
        style={{ marginTop: "10px", minHeight: "100px" }}
      >
        {match.mode === matchModeConst.live ? (
          <Grid item>
            <IconButton
              color="secondary"
              onClick={handleHomeScore}
              aria-label="add-home-goal"
            >
              <Add />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleHomeLose}
              aria-label="remove-away-goal"
            >
              <Remove />
            </IconButton>
          </Grid>
        ) : null}
        {changeMatchMode()}
        {match.mode === matchModeConst.live ? (
          <Grid item>
            <IconButton
              color="secondary"
              onClick={handleAwayLose}
              aria-label="remove-away-goal"
            >
              <Remove />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleAwayScore}
              aria-label="add-away-goal"
            >
              <Add />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </Rosetta>
  );
};

export default MatchDetailsDashboard;
