import React from "react";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { TeamListElementStyled } from "../../styled/styledTeams";
import { ListItemTextStyled } from "../../styled/styledBracket";
import { TeamData } from "../../models/teamData";
import {
  DeleteIconStyled,
  EditIconStyled,
  TeamsListIconButtonStyled,
} from "../../styled/styledIcons";

type Props = {
  team: TeamData;
  handleDeleteTeam: (team: TeamData) => void;
  handleEditTeam: (team: TeamData) => void;
};

const TeamSummary: React.FC<Props> = ({
  team,
  handleDeleteTeam,
  handleEditTeam,
}) => {
  const handleDelete = () => {
    handleDeleteTeam(team);
  };

  return (
    <TeamListElementStyled button>
      <ListItemTextStyled primary={team.name} />
      <ListItemSecondaryAction>
        <TeamsListIconButtonStyled onClick={handleDelete}>
          <DeleteIconStyled />
        </TeamsListIconButtonStyled>
        <TeamsListIconButtonStyled>
          <EditIconStyled />
        </TeamsListIconButtonStyled>
      </ListItemSecondaryAction>
    </TeamListElementStyled>
  );
};

export default TeamSummary;
