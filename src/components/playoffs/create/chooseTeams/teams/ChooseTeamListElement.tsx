import React from "react";

import { TeamData } from "../../../../../models/teamData";
import {
  ChooseTeamContentContainer,
  TeamActionContainer,
  TeamContainerStyled,
  TeamLogoContainer,
  TeamsItem,
} from "../../../../../styled/styledComponents/teams/styledLayout";
import { SIZE_LOGO, TeamLogo } from "../../../../global/Logo";
import { TypographyPrimaryText } from "../../../../../styled/styledComponents/styledTypography";
import { ChooseTeamIconButton } from "../../../../../styled/styledComponents/teams/styledButtons";

type Props = {
  team: TeamData;
  selected: boolean;
  addToChosenTeams: (chosenTeam: TeamData) => void;
  disabled: boolean;
};

const PlayOffsChooseListElement: React.FC<Props> = ({
  team,
  selected,
  disabled,
  addToChosenTeams,
}) => {
  return (
    <TeamsItem>
      <TeamContainerStyled
        onClick={() => (disabled ? false : addToChosenTeams(team))}
        style={{ cursor: "pointer" }}
      >
        <TeamLogoContainer>
          <TeamLogo teamLogo={team.logo} size={SIZE_LOGO.md} />
        </TeamLogoContainer>
        <ChooseTeamContentContainer isRestricted={disabled}>
          <TypographyPrimaryText style={{ color: "white" }}>
            {team.name}
          </TypographyPrimaryText>
        </ChooseTeamContentContainer>
        <TeamActionContainer>
          {!disabled ? (
            <ChooseTeamIconButton
              isSelected={selected}
              handleClick={() => (disabled ? false : addToChosenTeams(team))}
            />
          ) : null}
        </TeamActionContainer>
      </TeamContainerStyled>
    </TeamsItem>
  );
};

export default PlayOffsChooseListElement;
