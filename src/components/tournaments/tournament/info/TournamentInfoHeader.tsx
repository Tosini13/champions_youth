import React from "react";
import { Grid } from "@material-ui/core";
import { SIZE_LOGO, TeamLogo } from "../../../global/Logo";
import { TournamentTitle } from "../../../../styled/styledComponents/tournament/info/styledTypography";
import TournamentLogo from "../../../global/TournamentLogo";
import { Id } from "../../../../const/structuresConst";

export interface TournamentInfoHeaderProps {
  image?: string;
  title: string;
  authorId: Id;
}

const TournamentInfoHeader: React.FC<TournamentInfoHeaderProps> = ({
  image,
  title,
  authorId,
}) => {
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Grid item>
        <TournamentLogo
          teamLogo={image}
          size={SIZE_LOGO.lg}
          authorId={authorId}
        />
      </Grid>
      <Grid item style={{ flexGrow: 1 }}>
        <TournamentTitle align="center">{title}</TournamentTitle>
      </Grid>
    </Grid>
  );
};

export default TournamentInfoHeader;
