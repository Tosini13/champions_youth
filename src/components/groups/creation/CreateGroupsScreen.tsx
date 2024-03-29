import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { Grid } from "@material-ui/core";

import CreateGroupForm from "./GroupForm/CreateGroupForm";
import CreateGroupsActions from "./CreateGroupsActions";
import CreationNav from "./nav/CreationNav";
import { GroupsContentContainerStyled } from "../../../styled/styledLayout";
import { TeamData } from "../../../models/teamData";
import { firestoreConnect } from "react-redux-firebase";
import ChooseTeams from "./GroupForm/ChooseTeams";
import { shuffle } from "../../playoffs/create/PlayOffsCreateDashboard";
import useCreateGroup from "../../../hooks/useCreateGroup";
import { GroupModel } from "../../../NewModels/Group";
import { Id } from "../../../const/structuresConst";
import { MatchTime } from "../../../NewModels/Matches";
import GroupSettings from "./settings/GroupSettings";
import { createWholeGroup } from "../../../store/actions/GroupActions";
import { useNotification } from "../../global/Notification";
import { useHistory } from "react-router-dom";
import { routerGenerateConst } from "../../../const/menuConst";
import { TournamentModel } from "../../../NewModels/Tournament";
import {
  GroupTeamsContainer,
  GroupTeamSummaryContainer,
} from "../../../styled/styledComponents/group/styledLayout";
import GroupTeamSummary from "../GroupTeamSummary";
import moment from "moment";

const GridContainer = styled(Grid)`
  margin-bottom: 120px;
`;

export interface CreateGroupsScreenProps {
  teams?: TeamData[];
  userId: Id;
  tournamentId: Id;
  tournament: TournamentModel;
  doesGroupsExist: Boolean;
  createGroup: (tournamentId: Id, group: GroupModel) => void;
}

export type SettingType = {
  time?: MatchTime;
  fields: number;
  returnMatches: boolean;
  startDate?: Date;
};

const CreateGroupsScreen: React.FC<CreateGroupsScreenProps> = ({
  teams,
  userId,
  tournamentId,
  tournament,
  doesGroupsExist,
  createGroup,
}) => {
  const history = useHistory();
  if (doesGroupsExist) {
    history.push("/");
  }
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingType>({
    returnMatches: false,
    fields: 1,
    startDate: tournament?.date ? new Date(tournament?.date) : undefined, // TODO: Change!
  });
  const [chosenGroup, setChosenGroup] = useState<GroupModel | undefined>(
    undefined
  );
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [groups, setGroups] = useState<GroupModel[]>([]);

  useEffect(() => {
    if (tournament?.date) {
      setSettings({ ...settings, startDate: new Date(tournament.date) });
    }
  }, [tournament?.date]);

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

  const handleUpdateGroup = (updatedGroup: GroupModel) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  const groupInValid = () => {
    setQuestion("theresNoTeamsOrMatchesInGroup");
    setAnswers([
      {
        title: "ok",
      },
    ]);
    openNotification();
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSaveGroup = () => {
    let valid = true;
    groups.forEach((group) => {
      if (!group.teams.length || !group.matches.length) {
        valid = false;
      }
    });
    if (!valid) {
      setTimeout(groupInValid, 10);
      return false;
    }
    groups.forEach((group) => {
      createGroup(tournamentId, group);
    });
    history.push(routerGenerateConst.tournament(tournamentId));
  };

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
      groups[i % groups.length]?.teams.push(team);
    });
    setGroups(
      initGroupMatches({
        groups,
        returnMatches: settings.returnMatches,
        fields: settings.fields,
        time: settings.time,
        date: moment(settings.startDate).format(),
      })
    );
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
    setGroups(
      initGroupMatches({
        groups,
        returnMatches: settings.returnMatches,
        fields: settings.fields,
        time: settings.time,
        date: moment(settings.startDate).format(),
      })
    );
  }, [groups, initGroupMatches, settings, tournament, setGroups]);

  return (
    <>
      <CreationNav
        cancel={handleCancel}
        save={handleSaveGroup}
        openSettings={() => setOpenSettings(true)}
        add={handleAddGroup}
        draw={handleDrawGroup}
      />
      <GroupsContentContainerStyled>
        <GridContainer
          container
          spacing={5}
          direction="row"
          aria-label="group-forms-container"
        >
          {groups.map((group) => {
            return (
              <Grid item key={group.id} xs={12} md={6} lg={4}>
                <CreateGroupForm
                  userId={userId}
                  group={group}
                  handleOpenTeams={handleOpenTeams}
                  handleRemoveGroup={handleRemoveGroup}
                  handleUpdateGroup={handleUpdateGroup}
                >
                  {group.teams.length ? (
                    <GroupTeamsContainer style={{ marginBottom: "15px" }}>
                      {group.teams?.map((team) => (
                        <GroupTeamSummaryContainer key={team.id}>
                          <GroupTeamSummary team={team} />
                        </GroupTeamSummaryContainer>
                      ))}
                    </GroupTeamsContainer>
                  ) : null}
                </CreateGroupForm>
              </Grid>
            );
          })}
        </GridContainer>
      </GroupsContentContainerStyled>
      <CreateGroupsActions add={handleAddGroup} draw={handleDrawGroup} />
      <ChooseTeams
        userId={userId}
        tournamentId={tournamentId}
        teams={teams}
        chosenGroup={chosenGroup}
        chosenTeams={chosenTeams}
        open={Boolean(chosenGroup)}
        setChosenTeams={setChosenTeams}
        handleOpenTeams={handleOpenTeams}
        handleChooseGroupTeam={handleChooseTeam}
      />
      <GroupSettings
        open={openSettings}
        handleClose={handleCloseSettings}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const tournaments: TournamentModel[] | undefined =
    state.firestore.data.tournaments;
  const tournament: TournamentModel | undefined = tournaments
    ? tournaments[tournamentId]
    : undefined;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  return {
    teams,
    tournamentId,
    tournament,
    userId: state.firebase.auth.uid,
    doesGroupsExist: Boolean(state.firestore.ordered.groups?.length),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGroup: (tournamentId: Id, group: GroupModel) =>
      dispatch(createWholeGroup(tournamentId, group)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    return [
      { collection: "tournaments" },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "groups", orderBy: ["name", "asc"] }],
        storeAs: "groups",
      },
    ];
  })
)(CreateGroupsScreen);
