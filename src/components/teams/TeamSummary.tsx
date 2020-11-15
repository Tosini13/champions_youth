import React, { useState, ChangeEvent, useEffect } from "react";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { TeamListElementStyled } from "../../styled/styledTeams";
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
import { Id } from "../../const/structuresConst";
import { getImage } from "../tournaments/actions/getImage";
import Logo, { SIZE_LOGO } from "../global/Logo";

type Props = {
  team: TeamData;
  handleDeleteTeam: (team: TeamData) => void;
  handleEditTeam: (team: TeamData) => void;
  userId: Id;
  isOwner: boolean;
};

const TeamSummary: React.FC<Props> = ({
  team,
  handleDeleteTeam,
  handleEditTeam,
  userId,
  isOwner,
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
  const [logo, setLogo] = useState<any>(null);

  useEffect(() => {
    if (team?.logo && userId) {
      const image = getImage(team.logo, userId);
      setLogo(image);
    }
  }, [team, userId]);

  return (
    <TeamListElementStyled button>
      <Logo src={logo} size={SIZE_LOGO.sm} />
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
          <ListItemTextStyled
            primary={team.name}
            style={{ marginLeft: "5px" }}
          />
          {isOwner ? (
            <ListItemSecondaryAction>
              <TeamsListIconButtonStyled onClick={handleDelete}>
                <DeleteIconStyled />
              </TeamsListIconButtonStyled>
              <TeamsListIconButtonStyled onClick={() => setEdit(true)}>
                <EditIconStyled />
              </TeamsListIconButtonStyled>
            </ListItemSecondaryAction>
          ) : null}
        </>
      )}
    </TeamListElementStyled>
  );
};

export default TeamSummary;
