import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Button, Fab, Grid } from "@material-ui/core";

import styled from "styled-components";
import { mainTheme } from "../../../../styled/styledConst";
import { useForm } from "react-hook-form";
import { TextFieldStyled } from "../../../../styled/styledForm";
import { connect } from "react-redux";
import groupCreationDict from "../../../../locale/creationNav.dict.";
import { LOCALE } from "../../../../locale/config";
import GroupTeamsList from "./GroupTeamsList";
import { useNotification } from "../../../global/Notification";
import { Id } from "../../../../const/structuresConst";
import { GroupModel } from "../../../../NewModels/Group";

const GridContainer = styled(Grid)`
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: ${mainTheme.palette.primary.main};
  position: relative;
`;

const DeleteFab = styled(Fab)`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(5%, -30%);
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
}) => {
  const { openNotification, setQuestion, setAnswers } = useNotification();
  const { handleSubmit, register, errors } = useForm<GroupModel>({
    defaultValues: {
      id: group.id,
      name: group.name,
      teams: group.teams,
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
              helperText={errors.name && "Nie prawidłowa nazwa grupy"}
              error={Boolean(errors.name)}
            />
          </Grid>
          <Grid item>
            <GroupTeamsList teams={group.teams} userId={userId} />
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleOpenTeams(group)}
            >
              <Translator id="addTeam" />
            </Button>
          </Grid>
          <Grid item>Matches</Grid>
          <DeleteFab color="secondary" size="small" onClick={handleRemove}>
            <DeleteOutlineIcon />
          </DeleteFab>
        </GridContainer>
      </form>
    </Rosetta>
  );
};

const mapStateToProps = (state: any) => {
  return {
    locale: state.dictionary.locale,
    userId: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(CreateGroupForm);
