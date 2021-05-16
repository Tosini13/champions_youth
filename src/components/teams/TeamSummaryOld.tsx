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
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";
import Logo, { SIZE_LOGO } from "../global/Logo";
import { useNotification } from "../global/Notification";

type Props = {
  tournamentId: Id;
  team: TeamData;
  handleDeleteTeam: (team: TeamData) => void;
  handleEditTeam: (team: TeamData) => void;
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

  const handleExecuteDelete = () => {
    handleDeleteTeam(team);
  };

  const handleDelete = () => {
    setQuestion("doDeleteTeam");
    setAnswers([
      {
        title: "yes",
        action: handleExecuteDelete,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
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
    if (team?.logo) {
      getImage(team.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && team.logo) {
            img = getImageJustUploaded(team.logo, tournamentId) ?? undefined;
          }
          setLogo(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [team, tournamentId]);

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
          <ListItemSecondaryAction>
            {isOwner && !isCreated ? (
              <TeamsListIconButtonStyled onClick={handleDelete} size="small">
                <DeleteIconStyled />
              </TeamsListIconButtonStyled>
            ) : null}

            {isOwner ? (
              <TeamsListIconButtonStyled
                onClick={() => setEdit(true)}
                size="small"
              >
                <EditIconStyled />
              </TeamsListIconButtonStyled>
            ) : null}
          </ListItemSecondaryAction>
        </>
      )}
    </TeamListElementStyled>
  );
};

export default TeamSummary;
