import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import { shuffle } from "../../playoffs/create/PlayOffsCreateDashboard";
import useCreateGroup from "../../../hooks/useCreateGroup";
import { GroupModel } from "../../../NewModels/Group";
import { LOCALE } from "../../../locale/config";
import { Id } from "../../../const/structuresConst";
import { MatchTime } from "../../../NewModels/Matches";
import GroupSettings from "./GroupSettings";

const GridContainer = styled(Grid)`
  margin-bottom: 20px;
`;

export interface CreateGroupsScreenProps {
  teams?: TeamData[];
  locale: LOCALE;
  userId: Id;
}

const CreateGroupsScreen: React.FC<CreateGroupsScreenProps> = ({
  teams,
  locale,
  userId,
}) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [time, setTime] = useState<MatchTime | undefined>();
  const [returnMatches, setReturnMatches] = useState<boolean>(false);
  const [chosenGroup, setChosenGroup] = useState<GroupModel | undefined>(
    undefined
  );
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [groups, setGroups] = useState<GroupModel[]>([]);

  const { initGroupMatches } = useCreateGroup();

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const createNewGroup = () => {
    let groupN = "";
    for (let i = 0; i < groups.length + 1; i++) {
      groupN = String.fromCharCode(65 + i);
      const n = `Group${groupN}`;
      let isFree = true;
      groups.forEach((group) => (group.id === n ? (isFree = false) : true));
      if (isFree) break;
    }
    const newGroup: GroupModel = {
      id: `Group${groupN}`,
      name: `Group ${groupN}`,
      teams: [],
      matches: [],
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

  const handleRemoveGroup = (selected: GroupModel) => {
    let newGroups = groups.filter((group) => group.id !== selected.id);
    setChosenTeams(
      chosenTeams.filter((team) => !selected.teams.includes(team))
    );
    setGroups([...newGroups]);
  };

  const handleDrawGroup = () => {
    groups.forEach((group) => (group.teams = []));
    let shuffledTeams = shuffle(teams);
    shuffledTeams?.forEach((team, i) => {
      groups[i % groups.length].teams.push(team);
    });
    setGroups(initGroupMatches(groups, returnMatches, time));
    setChosenTeams(shuffledTeams ?? []);
  };

  const handleOpenTeams = (group?: GroupModel) => {
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

  useEffect(() => {
    setGroups(initGroupMatches(groups, returnMatches, time));
  }, [groups, initGroupMatches, time, returnMatches]);

  console.log(time);
  return (
    <>
      <CreationNav
        save={handleSaveGroup}
        openSettings={() => setOpenSettings(true)}
      />
      <ContentContainerStyled>
        <GridContainer container spacing={5} direction="column">
          {groups.map((group) => {
            return (
              <Grid item key={group.id}>
                <CreateGroupForm
                  locale={locale}
                  userId={userId}
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
      <GroupSettings
        locale={locale}
        open={openSettings}
        handleClose={handleCloseSettings}
        time={time}
        setTime={setTime}
        returnMatches={returnMatches}
        setReturnMatches={setReturnMatches}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  return {
    teams,
    tournamentId,
    locale: state.dictionary.locale,
    userId: state.firebase.auth.uid,
  };
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
