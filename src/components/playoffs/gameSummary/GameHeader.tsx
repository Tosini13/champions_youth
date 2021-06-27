import React from "react";

import { Grid } from "@material-ui/core";

import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import {
  TypographyMatchHeader,
  ShowRound,
} from "../../../styled/styledComponents/match/styledTypography";

export interface MatchHeaderProps {
  round: string;
}

const GameHeader: React.FC<MatchHeaderProps> = ({ round }) => {
  return (
    <MatchHeaderContainer justify="center">
      <Grid item>
        {round ? (
          <TypographyMatchHeader>
            <ShowRound round={round} />
          </TypographyMatchHeader>
        ) : null}
      </Grid>
    </MatchHeaderContainer>
  );
};

export default GameHeader;
