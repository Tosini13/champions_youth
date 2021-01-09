import React from "react";

import { TeamListElementStyled } from "../../../../styled/styledTeams";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { ListItemTextStyled } from "../../../../styled/styledBracket";
import { NewPlaceholder } from "../../../../NewModels/Team";

type Props = {
  team: NewPlaceholder;
};

const PlaceholderTeamsListElement: React.FC<Props> = ({ team }) => {
  return (
    <TeamListElementStyled button>
      <Logo size={SIZE_LOGO.sm} />
      <>
        <ListItemTextStyled
          primary={`${team.id} ${team.place}`}
          style={{ marginLeft: "5px" }}
        />
      </>
    </TeamListElementStyled>
  );
};

export default PlaceholderTeamsListElement;
