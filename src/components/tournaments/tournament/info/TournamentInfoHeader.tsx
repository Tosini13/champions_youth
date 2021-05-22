import React from "react";
import { Grid } from "@material-ui/core";
import { SIZE_LOGO, TeamLogo } from "../../../global/Logo";
import { TournamentTitle } from "../../../../styled/styledComponents/tournament/info/styledTypography";

export interface TournamentInfoHeaderProps {
  image?: string;
  title: string;
}

const TournamentInfoHeader: React.FC<TournamentInfoHeaderProps> = ({
  image,
  title,
}) => {
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Grid item>
        <TeamLogo teamLogo={image} size={SIZE_LOGO.lg} />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <TournamentTitle align="center">{title}</TournamentTitle>
      </Grid>
    </Grid>
  );
};

export default TournamentInfoHeader;
