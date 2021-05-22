import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { TeamData } from "../../models/teamData";
import Logo, { SIZE_LOGO, TeamLogo } from "../global/Logo";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";

export interface GroupTeamSummaryProps {
  team: TeamData;
}

const GroupTeamSummary: React.FC<GroupTeamSummaryProps> = ({ team }) => {
  return (
    <Grid container spacing={1} wrap="nowrap" style={{ paddingLeft: "10px" }}>
      <Grid item>
        <TeamLogo teamLogo={team.logo} size={SIZE_LOGO.sm} />
      </Grid>
      <Grid item>
        <TypographyPrimaryText>{team.name}</TypographyPrimaryText>
      </Grid>
    </Grid>
  );
};

export default GroupTeamSummary;
