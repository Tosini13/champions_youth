import React from "react";
import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchRoundDateStyled,
} from "../../../styled/styledMatch";
import { MatchData } from "../../../structures/match";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";
import { mainTheme, styledColors } from "../../../styled/styledConst";
import MatchContent from "./MatchContent";

const MatchHeader = styled(Grid)`
  background-color: ${mainTheme.palette.primary.main};
  padding: 1px 6px;
  font-size: 9px;
`;

export interface MatchSummaryProps {
  match: MatchData;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match }) => {
  return (
    <MatchContainerStyled>
      <MatchHeader container justify="space-between">
        <Grid item>
          {match.round ? (
            <MatchRoundTitleStyled>Runda {match.round}</MatchRoundTitleStyled>
          ) : null}
        </Grid>
        <Grid item>
          {match.mode === matchModeConst.live ? (
            <Typography
              style={{ fontSize: "9px", color: styledColors.icons.live }}
            >
              LIVE
            </Typography>
          ) : null}
        </Grid>
        <Grid item>
          {match.date ? (
            <MatchRoundDateStyled>
              {match.date.format("YYYY-MM-DD HH:mm")}
            </MatchRoundDateStyled>
          ) : null}
        </Grid>
      </MatchHeader>
      <MatchContent match={match} />
    </MatchContainerStyled>
  );
};

export default MatchSummary;
