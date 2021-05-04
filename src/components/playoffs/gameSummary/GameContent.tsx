import React from "react";
import { Rosetta } from "react-rosetta";
import { connect } from "react-redux";

import { MatchData } from "../../../structures/match";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";
import { LOCALE } from "../../../locale/config";
import matchDict from "../../../locale/matchDict";
import { styledColors } from "../../../styled/themes/other";
import { parseStyledBoolean } from "../../../helpers/booleanParser";
import ShowTeam from "../../matches/ShowTeam";
import { Game } from "../../../models/gameData";

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

const ResultTypographyStyled = styled(Typography)<{ isLive?: string }>`
  color: white;
  ${(props) =>
    props.isLive
      ? `
  color: ${styledColors.icons.live};
  font-weight: bold;`
      : ""}
`;

const GridContainer = styled(Grid)`
  padding: 0px 20px;
`;

export interface MatchContentProps {
  game: Game;
  locale: LOCALE;
}

const GameContent: React.FC<MatchContentProps> = ({ game, locale }) => {
  console.log("game", game);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <GridContainer container alignItems="center" wrap="nowrap">
        <Grid item xs={5}>
          <HostName>
            <ShowTeam
              team={game?.homeTeam}
              placeholder={game?.placeholder?.home}
            />
          </HostName>
        </Grid>
        <Grid item xs={2}>
          <ResultTypographyStyled align="center">VS</ResultTypographyStyled>
        </Grid>
        <Grid item xs={5}>
          <GuestName>
            <ShowTeam
              team={game?.awayTeam}
              placeholder={game?.placeholder?.away}
            />
          </GuestName>
        </Grid>
      </GridContainer>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(GameContent);

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
