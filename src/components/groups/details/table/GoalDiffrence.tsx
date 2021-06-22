import React from "react";
import { Grid } from "@material-ui/core";
import { TypographyPrimaryText } from "../../../../styled/styledComponents/styledTypography";

export interface GoalDiffrenceProps {
  scored: number;
  lost: number;
  diffrence: number;
}

const GoalDiffrence: React.FC<GoalDiffrenceProps> = ({
  scored,
  lost,
  diffrence,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <TypographyPrimaryText align="center">{scored}</TypographyPrimaryText>
      </Grid>
      <Grid item xs={3}>
        <TypographyPrimaryText align="center">{"-"}</TypographyPrimaryText>
      </Grid>
      <Grid item xs={3}>
        <TypographyPrimaryText align="center">{lost}</TypographyPrimaryText>
      </Grid>
      <Grid item xs={3}>
        <TypographyPrimaryText align="right">
          ({diffrence})
        </TypographyPrimaryText>
      </Grid>
    </Grid>
  );
};

export default GoalDiffrence;
