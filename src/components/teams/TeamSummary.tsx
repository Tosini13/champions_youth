import React, { useState, ChangeEvent, useEffect } from "react";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
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
import { LogoTeamStyled } from "../../styled/styledLayout";
import { getImage } from "../tournaments/actions/getImage";

type Props = {
  team: TeamData;
  handleDeleteTeam: (team: TeamData) => void;
  handleEditTeam: (team: TeamData) => void;
  authorId: Id;
};

const TeamSummary: React.FC<Props> = ({
  team,
  handleDeleteTeam,
  handleEditTeam,
  authorId,
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
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (team?.logo && authorId) {
      const image = getImage(team.logo, authorId);
      setImage(image);
    }
  }, [team, authorId]);

  console.log(image);
  return (
    <TeamListElementStyled button>
      <LogoTeamStyled src={image ? image : trophy}></LogoTeamStyled>
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
