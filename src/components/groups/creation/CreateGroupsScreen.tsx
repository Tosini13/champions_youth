import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import CreateGroupForm from "./GroupForm/CreateGroupForm";
import CreateGroupsActions from "./CreateGroupsActions";
import CreationNav from "./CreationNav";
import { ContentContainerStyled } from "../../../styled/styledLayout";
import { TeamData } from "../../../models/teamData";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import ChooseTeams from "./GroupForm/ChooseTeams";
import { Id } from "../../../const/structuresConst";
import { MatchData } from "../../../structures/match";

export type GroupCreationModel = {
  id: Id;
  name: string;
  teams: TeamData[];
  matches?: MatchData[];
};

const GridContainer = styled(Grid)`
  margin-bottom: 20px;
`;

export interface CreateGroupsScreenProps {
  teams?: TeamData[];
}

const CreateGroupsScreen: React.FC<CreateGroupsScreenProps> = ({ teams }) => {
  const getChangeGroups = (qtt: number) => {
    let newGroups: GroupCreationModel[] = [];
    for (let i = 0; i < qtt; i++) {
      newGroups.push({
        id: `Group ${String.fromCharCode(65 + i)}`,
        name: `Group ${String.fromCharCode(65 + i)}`,
        teams: [],
      });
    }
    setGroups(newGroups);
  };

  const [chosenGroup, setChosenGroup] = useState<
    GroupCreationModel | undefined
  >(undefined);
  const [groups, setGroups] = useState<GroupCreationModel[]>([]);
  const handleSaveGroup = () => {};
  const handleAddGroup = () => {
    getChangeGroups(groups.length + 1);
  };
  const handleRemoveGroup = () => {
    getChangeGroups(groups.length - 1);
  };
  const handleDrawGroup = () => {};
  const handleOpenTeams = (group?: GroupCreationModel) => {
    setChosenGroup(group);
  };

  const handleChooseTeam = (selected: TeamData) => {
    if (!chosenGroup) return false;
    let chosenTeams: TeamData[] = [];
    if (chosenGroup.teams.includes(selected)) {
      chosenTeams = chosenGroup?.teams.filter(
        (team) => team.id !== selected?.id
      );
    } else {
      chosenTeams = [...chosenGroup.teams, selected];
    }
    const updatedGroup = {
      ...chosenGroup,
      teams: chosenTeams,
    };
    setChosenGroup(updatedGroup);
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  return (
    <>
      <CreationNav save={handleSaveGroup} />
      <ContentContainerStyled>
        <GridContainer container spacing={3} direction="column">
          {groups.map((group) => {
            return (
              <Grid item key={group.id}>
                <CreateGroupForm
                  group={group}
                  handleOpenTeams={handleOpenTeams}
                />
              </Grid>
            );
          })}
        </GridContainer>
      </ContentContainerStyled>
      <CreateGroupsActions
        add={handleAddGroup}
        remove={handleRemoveGroup}
        draw={handleDrawGroup}
      />
      <ChooseTeams
        teams={teams}
        chosenGroup={chosenGroup}
        open={Boolean(chosenGroup)}
        handleOpenTeams={handleOpenTeams}
        handleChooseGroupTeam={handleChooseTeam}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  return { teams, tournamentId };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [
      { collection: "tournaments" },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
    ];
  })
)(CreateGroupsScreen);
