import React, { useState, useEffect } from "react";

import { Rosetta, Translator } from "react-rosetta";

import { Grid, Typography, useTheme } from "@material-ui/core";
import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";

import { Match } from "../../structures/dbAPI/matchData";
import {
  MatchDisplayTeamNameStyled,
  MatchDisplayResultGoalStyled,
} from "../../styled/styledMatch";

import { TypographyLiveMatchHeader } from "../../styled/styledComponents/match/styledTypography";

import Logo, { SIZE_LOGO, TeamLogo } from "../global/Logo";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";
import matchDict from "../../locale/matchDict";
import ShowTeam from "./ShowTeam";
import { useLocale } from "../../Provider/LocaleProvider";

export interface MatchDetailsDisplayProps {
  match: Match;
  tournamentId: Id;
  authorId: Id;
}

const MatchDetailsDisplay: React.FC<MatchDetailsDisplayProps> = ({ match }) => {
  const { locale } = useLocale();

  const isStarted: boolean = match.mode !== matchModeConst.notStarted;

  const theme = useTheme();
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <Grid container alignItems="center" style={{ paddingTop: "10px" }}>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <TeamLogo teamLogo={match.home?.logo} size={SIZE_LOGO.lg} />
            <MatchDisplayTeamNameStyled>
              <ShowTeam
                team={match.home}
                placeholder={match?.placeholder?.home}
                color={theme.palette.text.primary}
              />
            </MatchDisplayTeamNameStyled>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <TypographyLiveMatchHeader
                isLive={match.mode === matchModeConst.live}
              >
                <Translator id="live" />
              </TypographyLiveMatchHeader>
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <MatchDisplayResultGoalStyled>
                    {isStarted ? match.result?.home : undefined}
                  </MatchDisplayResultGoalStyled>
                </Grid>
                <Grid item>
                  <Typography color="secondary">vs</Typography>
                </Grid>
                <Grid item>
                  <MatchDisplayResultGoalStyled>
                    {isStarted ? match.result?.away : undefined}
                  </MatchDisplayResultGoalStyled>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TeamLogo teamLogo={match.away?.logo} size={SIZE_LOGO.lg} />
            </Grid>
            <Grid item>
              <MatchDisplayTeamNameStyled>
                <ShowTeam
                  team={match.away}
                  placeholder={match?.placeholder?.away}
                  color={theme.palette.text.primary}
                />
              </MatchDisplayTeamNameStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Rosetta>
  );
};

export default MatchDetailsDisplay;
