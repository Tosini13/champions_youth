import React, { useState, useEffect } from "react";

import { Rosetta } from "react-rosetta";
import { connect } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";

import { Match } from "../../structures/dbAPI/matchData";
import {
  MatchDisplayTeamNameStyled,
  MatchDisplayResultGoalStyled,
  LiveMarkStyled,
} from "../../styled/styledMatch";
import Logo, { SIZE_LOGO } from "../global/Logo";
import { getImage } from "../tournaments/actions/getImage";
import matchDict from "../../locale/matchDict";
import { LOCALE } from "../../locale/config";
import ShowTeam from "./ShowTeam";

export interface MatchDetailsDisplayProps {
  match: Match;
  authorId: Id;
  locale: LOCALE;
}

const MatchDetailsDisplay: React.FC<MatchDetailsDisplayProps> = ({
  match,
  authorId,
  locale,
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
    <Rosetta translations={matchDict} locale={locale}>
      <Grid container alignItems="center" style={{ paddingTop: "10px" }}>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Logo src={imageHome} size={SIZE_LOGO.lg} />
            <MatchDisplayTeamNameStyled>
              <ShowTeam
                team={match.home}
                placeholder={match?.placeholder?.home}
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
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Logo src={imageAway} size={SIZE_LOGO.lg} />
            </Grid>
            <Grid item>
              <MatchDisplayTeamNameStyled>
                <ShowTeam
                  team={match.away}
                  placeholder={match?.placeholder?.away}
                />
              </MatchDisplayTeamNameStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(MatchDetailsDisplay);
