import React from "react";
import moment, { Moment } from "moment";

import { Grid } from "@material-ui/core";

import { matchModeConst } from "../../../const/matchConst";
import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import {
  ShowRound,
  TypographyLiveMatchHeader,
  TypographyMatchHeader,
} from "../../../styled/styledComponents/match/styledTypography";

export interface MatchHeaderProps {
  mode: matchModeConst;
  round: string;
  date?: Moment;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ mode, round, date }) => {
  return (
    <MatchHeaderContainer>
      <Grid item xs={5}>
        {round ? (
          <TypographyMatchHeader>
            <ShowRound round={round} />
          </TypographyMatchHeader>
        ) : null}
      </Grid>
      <Grid item xs={2}>
        {mode === matchModeConst.live ? (
          <TypographyLiveMatchHeader>LIVE</TypographyLiveMatchHeader>
        ) : null}
      </Grid>
      <Grid item xs={5}>
        {date ? (
          <TypographyMatchHeader align="right">
            {moment(date).format("YYYY-MM-DD HH:mm")}
          </TypographyMatchHeader>
        ) : null}
      </Grid>
    </MatchHeaderContainer>
  );
};

export default MatchHeader;
