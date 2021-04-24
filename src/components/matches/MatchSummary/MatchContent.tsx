import React from "react";
import { Rosetta } from "react-rosetta";
import { connect } from "react-redux";

import { MatchData } from "../../../structures/match";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";
import { LOCALE } from "../../../locale/config";
import matchDict from "../../../locale/matchDict";
import ShowTeam from "../ShowTeam";

const TeamName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 10px;
  padding: 2px;
`;

const HostName = styled(TeamName)`
  text-align: right;
`;

const GuestName = styled(TeamName)`
  text-align: left;
`;

const ResultGoal = styled(Grid)`
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 13px;
  margin: 2px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  text-align: center;
`;

const ResultTypographyStyled = styled(Typography)``;
const Goal = styled(Typography)`
  font-size: 13px;
`;

const Divider = styled(Typography)`
  font-size: 13px;
  text-align: center;
`;

export interface MatchContentProps {
  match: MatchData;
  locale: LOCALE;
}

const MatchContent: React.FC<MatchContentProps> = ({ match, locale }) => {
  const isResult = match.mode !== matchModeConst.notStarted;
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <Grid container justify="space-evenly" alignItems="center" wrap="nowrap">
        <Grid item xs={5}>
          <HostName>
            <ShowTeam
              team={match.home}
              placeholder={match?.placeholder?.home}
            />
          </HostName>
        </Grid>
        <Grid item xs={2}>
          <Result home={match.result?.home} away={match.result?.away} />
          {/* <Grid container>
            <Grid item xs={5}>
              <Goal color="secondary">
                {isResult ? match.result?.home : null}
              </Goal>
            </Grid>
            <Grid item xs={2}>
              -
            </Grid>
            <Grid item xs={5}>
              <Goal color="secondary">
                {isResult ? match.result?.away : null}
              </Goal>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid item xs={5}>
          <GuestName>
            <ShowTeam
              team={match.away}
              placeholder={match?.placeholder?.away}
            />
          </GuestName>
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
export default connect(mapStateToProps)(MatchContent);

type TResultProps = {
  home?: number;
  away?: number;
};

const Result: React.FC<TResultProps> = ({ home, away }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <ResultTypographyStyled color="secondary" align="center">
          {home ?? ""}
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={2}>
        <ResultTypographyStyled color="secondary" align="center">
          -
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={5}>
        <ResultTypographyStyled color="secondary" align="center">
          {away ?? ""}
        </ResultTypographyStyled>
      </Grid>
    </Grid>
  );
};
