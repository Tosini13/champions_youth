import React from "react";
import { Grid } from "@material-ui/core";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { TournamentTitle } from "../../../../styled/styledComponents/tournament/info/styledTypography";

export interface TournamentInfoHeaderProps {
  image: string;
  title: string;
}

const TournamentInfoHeader: React.FC<TournamentInfoHeaderProps> = ({
  image,
  title,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Logo src={image} size={SIZE_LOGO.lg} />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <TournamentTitle align="center">{title}</TournamentTitle>
      </Grid>
    </Grid>
  );
};

export default TournamentInfoHeader;
