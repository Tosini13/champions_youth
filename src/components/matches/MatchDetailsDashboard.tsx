import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import IconButton from "@material-ui/core/IconButton";
import { Sports, Add, Remove } from "@material-ui/icons";

import { matchModeConst } from "../../const/matchConst";
import { Match } from "../../structures/dbAPI/matchData";
import { Grid, useMediaQuery } from "@material-ui/core";
import { Result } from "../../const/structuresConst";
import matchDict from "../../locale/matchDict";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";

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
  const { locale } = useLocale();

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

  const isSmUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ marginTop: "10px", minHeight: "100px" }}
      >
        {match.mode === matchModeConst.live ? (
          <Grid item>
            <Grid container spacing={isSmUp ? 3 : 1}>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={handleHomeScore}
                  aria-label="add-home-goal"
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={handleHomeLose}
                  aria-label="remove-away-goal"
                >
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        {changeMatchMode()}
        {match.mode === matchModeConst.live ? (
          <Grid item>
            <Grid container spacing={isSmUp ? 3 : 1}>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={handleAwayLose}
                  aria-label="remove-away-goal"
                >
                  <Remove />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={handleAwayScore}
                  aria-label="add-away-goal"
                >
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Rosetta>
  );
};

export default MatchDetailsDashboard;
