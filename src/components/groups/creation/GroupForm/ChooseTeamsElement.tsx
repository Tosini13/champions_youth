import React, { useState, useEffect } from "react";

import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import {
  getImage,
  getImageJustUploaded,
} from "../../../tournaments/actions/getImage";
import Logo, { SIZE_LOGO, TeamLogo } from "../../../global/Logo";
import {
  ChooseTeamContentContainer,
  TeamActionContainer,
  TeamContainerStyled,
  TeamLogoContainer,
  TeamsItem,
} from "../../../../styled/styledComponents/teams/styledLayout";
import { TypographyPrimaryText } from "../../../../styled/styledComponents/styledTypography";
import { ChooseTeamIconButton } from "../../../../styled/styledComponents/teams/styledButtons";

type Props = {
  team: TeamData;
  selected: boolean;
  restricted: boolean;
  handleChooseTeam: (selected: TeamData) => void;
};

const ChooseTeamsElement: React.FC<Props> = ({
  team,
  selected,
  restricted,
  handleChooseTeam,
}) => {
  return (
    <TeamsItem>
      <TeamContainerStyled
        onClick={() => (restricted ? false : handleChooseTeam(team))}
        style={{ cursor: "pointer" }}
      >
        <TeamLogoContainer>
          <TeamLogo teamLogo={team.logo} size={SIZE_LOGO.md} />
        </TeamLogoContainer>
        <ChooseTeamContentContainer isRestricted={restricted}>
          <TypographyPrimaryText style={{ color: "white" }}>
            {team.name}
          </TypographyPrimaryText>
        </ChooseTeamContentContainer>
        <TeamActionContainer>
          {!restricted ? (
            <ChooseTeamIconButton
              isSelected={selected}
              handleClick={() => handleChooseTeam(team)}
            />
          ) : null}
        </TeamActionContainer>
      </TeamContainerStyled>
    </TeamsItem>
  );
};

export default ChooseTeamsElement;
