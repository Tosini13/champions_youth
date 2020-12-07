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
  const [chosenGroup, setChosenGroup] = useState<
    GroupCreationModel | undefined
  >(undefined);

  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [groups, setGroups] = useState<GroupCreationModel[]>([]);

  const createNewGroup = () => {
    let groupN = "";
    for (let i = 0; i < groups.length + 1; i++) {
      groupN = String.fromCharCode(65 + i);
      const n = `Group${groupN}`;
      let isFree = true;
      groups.forEach((group) => (group.id === n ? (isFree = false) : true));
      if (isFree) break;
    }
    const newGroup: GroupCreationModel = {
      id: `Group${groupN}`,
      name: `Group ${groupN}`,
      teams: [],
    };
    return newGroup;
  };

  const handleSaveGroup = () => {};
  const handleAddGroup = () => {
    if (teams && teams.length <= groups.length) {
      return false;
    }
    const newGroup = createNewGroup();
    setGroups([...groups, newGroup]);
  };
  const handleRemoveGroup = (selected: GroupCreationModel) => {
    let newGroups = groups.filter((group) => group.id !== selected.id);
    setChosenTeams(
      chosenTeams.filter((team) => !selected.teams.includes(team))
    );
    setGroups([...newGroups]);
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
        <GridContainer container spacing={5} direction="column">
          {groups.map((group) => {
            return (
              <Grid item key={group.id}>
                <CreateGroupForm
                  group={group}
                  handleOpenTeams={handleOpenTeams}
                  handleRemoveGroup={handleRemoveGroup}
                />
              </Grid>
            );
          })}
        </GridContainer>
      </ContentContainerStyled>
      <CreateGroupsActions add={handleAddGroup} draw={handleDrawGroup} />
      <ChooseTeams
        teams={teams}
        chosenGroup={chosenGroup}
        chosenTeams={chosenTeams}
        open={Boolean(chosenGroup)}
        setChosenTeams={setChosenTeams}
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
