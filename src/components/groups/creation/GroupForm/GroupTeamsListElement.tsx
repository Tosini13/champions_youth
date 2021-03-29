import React, { useState, useEffect } from "react";

import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import {
  getImage,
  getImageJustUploaded,
} from "../../../tournaments/actions/getImage";
import { TeamListElementStyled } from "../../../../styled/styledTeams";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { ListItemTextStyled } from "../../../../styled/styledBracket";

type Props = {
  team: TeamData;
  userId: Id;
  tournamentId: Id;
};

const GroupTeamsListElement: React.FC<Props> = ({
  team,
  userId,
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
    <TeamListElementStyled button>
      <Logo src={logo} size={SIZE_LOGO.sm} />
      <>
        <ListItemTextStyled primary={team.name} style={{ marginLeft: "5px" }} />
      </>
    </TeamListElementStyled>
  );
};

export default GroupTeamsListElement;
