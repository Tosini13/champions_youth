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
import { GroupCreationModel } from "../CreateGroupsScreen";
import GroupTeamsList from "./GroupTeamsList";
import { useNotification } from "../../../global/Notification";

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
  group: GroupCreationModel;
  handleOpenTeams: (group: GroupCreationModel) => void;
  handleRemoveGroup: (selected: GroupCreationModel) => void;
  locale: LOCALE;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  group,
  handleOpenTeams,
  handleRemoveGroup,
  locale,
}) => {
  const { openNotification, setQuestion, setAnswers } = useNotification();
  const { handleSubmit, register, errors } = useForm<GroupCreationModel>({
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

  const onSubmit = (values: GroupCreationModel) => {
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
            <GroupTeamsList teams={group.teams} />
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
  };
};

export default connect(mapStateToProps)(CreateGroupForm);
