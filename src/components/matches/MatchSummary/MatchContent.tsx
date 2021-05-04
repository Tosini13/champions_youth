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
import { styledColors } from "../../../styled/themes/other";
import { parseStyledBoolean } from "../../../helpers/booleanParser";

export const TeamName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 10px;
  padding: 2px;
`;

export const HostName = styled(TeamName)`
  text-align: right;
`;

export const GuestName = styled(TeamName)`
  text-align: left;
`;

export const ResultTypographyStyled = styled(Typography)<{ isLive?: string }>`
  color: white;
  ${(props) =>
    props.isLive
      ? `
  color: ${styledColors.icons.live};
  font-weight: bold;`
      : ""}
`;

export const GridMatchContainer = styled(Grid)`
  padding: 0px 20px;
`;

export interface MatchContentProps {
  match: MatchData;
  locale: LOCALE;
}

const MatchContent: React.FC<MatchContentProps> = ({ match, locale }) => {
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <GridMatchContainer container alignItems="center" wrap="nowrap">
        <Grid item xs={5}>
          <HostName>
            <ShowTeam
              team={match.home}
              placeholder={match?.placeholder?.home}
            />
          </HostName>
        </Grid>
        <Grid item xs={2}>
          <Result
            home={match.result?.home}
            away={match.result?.away}
            mode={match.mode}
          />
        </Grid>
        <Grid item xs={5}>
          <GuestName>
            <ShowTeam
              team={match.away}
              placeholder={match?.placeholder?.away}
            />
          </GuestName>
        </Grid>
      </GridMatchContainer>
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
  mode: string;
};

const Result: React.FC<TResultProps> = ({ home, away, mode }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <ResultTypographyStyled
          align="right"
          isLive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          {home ?? ""}
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={2}>
        <ResultTypographyStyled
          align="center"
          isLive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          -
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={5}>
        <ResultTypographyStyled
          align="left"
          isLive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          {away ?? ""}
        </ResultTypographyStyled>
      </Grid>
    </Grid>
  );
};
