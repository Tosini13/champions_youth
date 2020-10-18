import React, { useState, ChangeEvent } from "react";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
import {
  TeamListElementStyled,
  TeamListItemImgStyled,
} from "../../styled/styledTeams";
import { ListItemTextStyled } from "../../styled/styledBracket";
import { TeamData } from "../../models/teamData";
import {
  ClearIconStyled,
  DeleteIconStyled,
  DoneIconStyled,
  EditIconStyled,
  TeamsListIconButtonStyled,
} from "../../styled/styledIcons";

import { EditTeamInputStyled } from "../../styled/styledForm";

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

  const handleEdit = () => {
    handleEditTeam({
      ...team,
      name,
    });
    setEdit(false);
  };

  const handleChange = (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(value.currentTarget.value);
  };

  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(team.name);

  return (
    <TeamListElementStyled button>
      <TeamListItemImgStyled src={team.logo ? team.logo : trophy} alt="logo" />
      {edit ? (
        <form onSubmit={handleEdit}>
          <EditTeamInputStyled
            type="text"
            value={name}
            onChange={handleChange}
          />
          <ListItemSecondaryAction>
            <TeamsListIconButtonStyled onClick={() => setEdit(false)}>
              <ClearIconStyled />
            </TeamsListIconButtonStyled>
            <TeamsListIconButtonStyled type="submit">
              <DoneIconStyled />
            </TeamsListIconButtonStyled>
          </ListItemSecondaryAction>
        </form>
      ) : (
        <>
          <ListItemTextStyled primary={team.name} />
          <ListItemSecondaryAction>
            <TeamsListIconButtonStyled onClick={handleDelete}>
              <DeleteIconStyled />
            </TeamsListIconButtonStyled>
            <TeamsListIconButtonStyled onClick={() => setEdit(true)}>
              <EditIconStyled />
            </TeamsListIconButtonStyled>
          </ListItemSecondaryAction>
        </>
      )}
    </TeamListElementStyled>
  );
};

export default TeamSummary;
