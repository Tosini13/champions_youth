import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useLogo } from "../../hooks/useLogo";
import { TeamData } from "../../models/teamData";
import Logo, { SIZE_LOGO } from "../global/Logo";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";

export interface GroupTeamSummaryProps {
  team: TeamData;
  tournamentId: string;
}

const GroupTeamSummary: React.FC<GroupTeamSummaryProps> = ({
  team,
  tournamentId,
}) => {
  const [logo, setLogo] = useState<any>(null);

  useEffect(() => {
    if (team?.logo) {
      getImage(team.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && team.logo) {
            img = getImageJustUploaded(team.logo, tournamentId) ?? undefined;
          }
          setLogo(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [team, tournamentId]);

  return (
    <Grid container spacing={1} wrap="nowrap">
      <Grid item>
        <Logo src={logo} size={SIZE_LOGO.sm} />
      </Grid>
      <Grid item>
        <TypographyPrimaryText>{team.name}</TypographyPrimaryText>
      </Grid>
    </Grid>
  );
};

export default GroupTeamSummary;
