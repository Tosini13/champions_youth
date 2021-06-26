import React from "react";

import { TeamListElementStyled } from "../../../../styled/styledTeams";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { NewPlaceholder } from "../../../../NewModels/Team";
import { ChooseTeamDialogTypography } from "../../../../styled/styledComponents/teams/styledButtons";

type Props = {
  team: NewPlaceholder;
};

const PlaceholderTeamsListElement: React.FC<Props> = ({ team }) => {
  return (
    <TeamListElementStyled button>
      <Logo size={SIZE_LOGO.sm} />
      <ChooseTeamDialogTypography>
        {`${team.id} ${team.place}`}
      </ChooseTeamDialogTypography>
    </TeamListElementStyled>
  );
};

export default PlaceholderTeamsListElement;
