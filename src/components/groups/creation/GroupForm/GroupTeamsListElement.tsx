import React, { useState, useEffect } from "react";

import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import { getImage } from "../../../tournaments/actions/getImage";
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
    if (team?.logo && userId) {
      const image = getImage(team.logo, userId, tournamentId);
      setLogo(image);
    }
  }, [team, userId, tournamentId]);

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
