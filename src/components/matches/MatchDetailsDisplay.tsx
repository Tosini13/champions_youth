import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
import { Match } from "../../structures/dbAPI/matchData";
import { LogoLargeStyled } from "../../styled/styledLayout";
import {
  MatchDisplayTeamNameStyled,
  MatchDisplayResultGoalStyled,
  LiveMarkStyled,
} from "../../styled/styledMatch";
import { getImage } from "../tournaments/actions/getImage";

export interface MatchDetailsDisplayProps {
  match: Match;
  authorId: Id;
}

const MatchDetailsDisplay: React.FC<MatchDetailsDisplayProps> = ({
  match,
  authorId,
}) => {
  const [imageHome, setImageHome] = useState<any>(null);
  const [imageAway, setImageAway] = useState<any>(null);

  useEffect(() => {
    if (match.home?.logo && authorId) {
      const image = getImage(match.home?.logo, authorId);
      setImageHome(image);
    }

    if (match.away?.logo && authorId) {
      const image = getImage(match.away?.logo, authorId);
      setImageAway(image);
    }
  }, [match, authorId]);

  const isStarted: boolean = match.mode !== matchModeConst.notStarted;
  return (
    <Grid container justify="space-evenly" alignItems="center">
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <LogoLargeStyled
            src={imageHome ? imageHome : trophy}
          ></LogoLargeStyled>
          <MatchDisplayTeamNameStyled>
            {match.home
              ? match.home.name
              : match.placeholder.home
              ? match.placeholder.home.name
              : "brak zespołu"}
          </MatchDisplayTeamNameStyled>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <LiveMarkStyled live={match.mode === matchModeConst.live}>
              LIVE
            </LiveMarkStyled>
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
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <LogoLargeStyled
              src={imageAway ? imageAway : trophy}
            ></LogoLargeStyled>
          </Grid>
          <Grid item>
            <MatchDisplayTeamNameStyled>
              {match.away
                ? match.away.name
                : match.placeholder.away
                ? match.placeholder.away.name
                : "brak zespołu"}
            </MatchDisplayTeamNameStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatchDetailsDisplay;
