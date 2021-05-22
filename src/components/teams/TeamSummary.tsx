import React from "react";

import { TeamData } from "../../models/teamData";
import { Edit, Delete } from "@material-ui/icons";

import { Id } from "../../const/structuresConst";
import { SIZE_LOGO, TeamLogo } from "../global/Logo";
import { useNotification } from "../global/Notification";
import {
  TeamContentContainer,
  TeamLogoContainer,
  TeamsItem,
  TeamContainerStyled,
  TeamActionContainer,
} from "../../styled/styledComponents/teams/styledLayout";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import { TeamItemIconButton } from "../../styled/styledComponents/teams/styledButtons";

type Props = {
  tournamentId: Id;
  team: TeamData;
  handleDeleteTeam: () => void;
  handleEditTeam: () => void;
  userId: Id;
  isOwner: boolean;
  isCreated: boolean;
};

const TeamSummary: React.FC<Props> = ({
  team,
  handleDeleteTeam,
  handleEditTeam,
  userId,
  tournamentId,
  isOwner,
  isCreated,
}) => {
  const { setQuestion, setAnswers, openNotification } = useNotification();

  const handleDelete = () => {
    setQuestion("doDeleteTeam");
    setAnswers([
      {
        title: "yes",
        action: handleDeleteTeam,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };

  return (
    <TeamsItem>
      <TeamContainerStyled>
        <TeamLogoContainer>
          <TeamLogo teamLogo={team.logo} size={SIZE_LOGO.md} />
        </TeamLogoContainer>
        <TeamContentContainer>
          <TypographyPrimaryText style={{ color: "white" }}>
            {team.name}
          </TypographyPrimaryText>
        </TeamContentContainer>
        <TeamActionContainer>
          {isOwner && !isCreated ? (
            <TeamItemIconButton onClick={handleDelete} size="medium">
              <Delete />
            </TeamItemIconButton>
          ) : null}

          {isOwner ? (
            <TeamItemIconButton onClick={() => handleEditTeam()} size="medium">
              <Edit />
            </TeamItemIconButton>
          ) : null}
        </TeamActionContainer>
      </TeamContainerStyled>
    </TeamsItem>
  );
};

export default TeamSummary;
