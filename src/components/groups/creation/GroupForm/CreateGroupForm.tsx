import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Grid, IconButton } from "@material-ui/core";

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
import { DialogRU } from "../../../../styled/styledDialog";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";

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
  ${ScrollBarStyled}
`;

export interface CreateGroupFormProps {
  group: GroupModel;
  handleOpenTeams: (group: GroupModel) => void;
  handleRemoveGroup: (selected: GroupModel) => void;
  handleUpdateGroup: (updatedGroup: GroupModel) => void;
  locale: LOCALE;
  userId: Id;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  group,
  handleOpenTeams,
  handleRemoveGroup,
  handleUpdateGroup,
  locale,
  userId,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { openNotification, setQuestion, setAnswers } = useNotification();
  const { handleSubmit, register, errors, getValues } = useForm<GroupModel>({
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

  const handleUpdate = () => {
    const { name } = getValues();
    handleUpdateGroup({
      ...group,
      name,
    });
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
              onChange={() => handleUpdate()}
            />
          </Grid>
          <Grid item>
            {children}
            <ButtonRC size="small" onClick={() => handleOpenTeams(group)}>
              <Translator id="addTeam" />
            </ButtonRC>
          </Grid>
          {group.matches.length ? (
            <Grid item>
              <ButtonRC size="small" onClick={() => setOpen(true)}>
                <Translator id="showMatches" />
              </ButtonRC>
            </Grid>
          ) : null}
          <DeleteIconButton
            color="secondary"
            size="small"
            onClick={handleRemove}
          >
            <DeleteOutlineIcon />
          </DeleteIconButton>
          <DialogRU
            open={open}
            onClose={handleClose}
            title="matches"
            locale={locale}
          >
            <GridMatchesContainer container direction="column">
              {group.matches?.map((match) => {
                const homePlaceholder = group.groupTeams?.find(
                  (team) => team.place === match.groupPlaceholder?.home
                );
                const awayPlaceholder = group.groupTeams?.find(
                  (team) => team.place === match.groupPlaceholder?.away
                );
                if (homePlaceholder) {
                  match.placeholder.home = {
                    id: homePlaceholder.group?.id,
                    place: homePlaceholder.group?.place,
                    name: `${homePlaceholder.group?.id}`,
                  };
                }
                if (awayPlaceholder) {
                  match.placeholder.away = {
                    id: awayPlaceholder.group?.id,
                    place: awayPlaceholder.group?.place,
                    name: `${awayPlaceholder.group?.id}`,
                  };
                }
                return (
                  <Grid item key={match.id}>
                    <MatchSummaryMock match={match} locale={locale} />
                  </Grid>
                );
              })}
            </GridMatchesContainer>
          </DialogRU>
        </GridContainer>
      </form>
    </Rosetta>
  );
};

export default CreateGroupForm;
