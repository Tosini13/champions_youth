import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import styled from "styled-components";
import { mainTheme } from "../../../../styled/styledConst";
import { useForm } from "react-hook-form";
import { TextFieldStyled } from "../../../../styled/styledForm";
import groupCreationDict from "../../../../locale/creationNav.dict.";
import { LOCALE } from "../../../../locale/config";
import { useNotification } from "../../../global/Notification";
import { Id } from "../../../../const/structuresConst";
import { GroupModel } from "../../../../NewModels/Group";
import MatchSummaryMock from "./MatchSummaryMock";
import { DialogStyled } from "../../../../styled/styledLayout";

const GridContainer = styled(Grid)`
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${mainTheme.palette.primary.main};
  position: relative;
`;

const DeleteIconButton = styled(IconButton)`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(-10%, 10%);
`;

const GridMatchesContainer = styled(Grid)`
  overflow-x: hidden;
  flex-wrap: nowrap;
`;

export interface CreateGroupFormProps {
  group: GroupModel;
  handleOpenTeams: (group: GroupModel) => void;
  handleRemoveGroup: (selected: GroupModel) => void;
  locale: LOCALE;
  userId: Id;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  group,
  handleOpenTeams,
  handleRemoveGroup,
  locale,
  userId,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { openNotification, setQuestion, setAnswers } = useNotification();
  const { handleSubmit, register, errors } = useForm<GroupModel>({
    defaultValues: {
      id: group.id,
      name: group.name,
      teams: group.teams,
      matches: group.matches,
    },
  });

  const handleRemove = () => {
    setQuestion("doDeleteGroups");
    setAnswers([
      {
        title: "Yes",
        action: () => {
          handleRemoveGroup(group);
        },
      },
      {
        title: "No",
      },
    ]);
    openNotification();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: GroupModel) => {
    console.log(values);
  };

  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer
          container
          direction="column"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <TextFieldStyled
              label={<Translator id="groupName" />}
              color="secondary"
              inputProps={{
                name: "name",
                ref: register({
                  required: "Required",
                }),
              }}
              helperText={errors.name && <Translator id="wrongGroupName" />}
              error={Boolean(errors.name)}
            />
          </Grid>
          <Grid item>
            {children}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleOpenTeams(group)}
            >
              <Translator id="addTeam" />
            </Button>
          </Grid>
          {group.matches.length ? (
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => setOpen(true)}
              >
                <Translator id="showMatches" />
              </Button>
            </Grid>
          ) : null}
          <DeleteIconButton
            color="secondary"
            size="small"
            onClick={handleRemove}
          >
            <DeleteOutlineIcon />
          </DeleteIconButton>
          <DialogStyled open={open} onClose={handleClose}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={5}
            >
              <Grid item>
                <Typography variant="h6">
                  <Translator id="matches" />
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <GridMatchesContainer container direction="column">
              {group.matches?.map((match) => (
                <Grid item key={match.id}>
                  <MatchSummaryMock match={match} locale={locale} />
                </Grid>
              ))}
            </GridMatchesContainer>
          </DialogStyled>
        </GridContainer>
      </form>
    </Rosetta>
  );
};

export default CreateGroupForm;
