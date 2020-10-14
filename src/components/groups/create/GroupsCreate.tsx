import React, { useState } from "react";

import GroupsCreateCreateMenu from "./GroupsCreateCreateMenu";
import GroupList from "./GroupsList";
import GroupsChooseTeamsList from "./GroupsChooseTeamsList";
import { TeamData } from "../../../models/teamData";
import { GroupStage } from "../../../structures/groupStage";
import { TournamentData } from "../../../models/tournamentData";
import { GroupData } from "../../../models/groupData";
import { createGroup } from "../../../store/actions/GroupActions";
import { connect } from "react-redux";
import { MatchDataDb } from "../../../structures/dbAPI/matchData";
import { GroupDataDb } from "../../../structures/dbAPI/groupData";
import { Id } from "../../../const/structuresConst";
import { useParams } from "react-router-dom";

type Props = {
  tournament: TournamentData;
  teams: TeamData[];
  groupStage: GroupStage;
  toggleCreate: () => void;
  createGroup: (
    tournamentId: Id,
    group: GroupDataDb,
    matches?: MatchDataDb[]
  ) => void;
};

const GroupsCreate: React.FC<Props> = ({
  tournament,
  groupStage,
  teams,
  toggleCreate,
  createGroup,
}) => {
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [chosenGroup, setChosenGroup] = useState<GroupData>();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const submitGroups = () => {
    console.log(groups);
    const groupsDb = groupStage.convertToDb(groups);
    console.log(groupsDb);
    groupsDb.forEach((group) => {
      console.log(group);
      createGroup(tournamentId, group.groupData, group.matchesData);
    });
    toggleCreate();
  };

  const cancelCreation = () => {
    toggleCreate();
  };

  const drawGroupsMatches = () => {
    if (groupStage.groups.length) {
      const newGroups = groupStage.createRandomGroups(
        teams,
        groupStage.groups.length,
        tournament,
        false
      );
      setGroups(newGroups);
    }
  };

  const addGroup = () => {
    console.log(
      groupStage,
      groupStage.groups.length,
      Math.ceil(teams.length / 2) - 1,
      teams
    );
    if (
      groupStage &&
      groupStage.groups.length < Math.ceil(teams.length / 2) - 1
    ) {
      console.log(groupStage);
      setChosenTeams([]);
      const newGroups = groupStage?.createGroups(
        teams,
        groupStage.groups.length + 1
      );
      setGroups(newGroups);
    }
  };

  const removeGroup = () => {
    if (groupStage && groupStage.groups.length > 1) {
      setChosenTeams([]);
      const newGroups = groupStage?.createGroups(
        teams,
        groupStage.groups.length - 1
      );
      setGroups(newGroups);
    }
  };

  const handleChooseTeam = (team: TeamData) => {
    if (
      chosenTeams.includes(team) &&
      chosenGroup?.teams &&
      !chosenGroup.teams.includes(team)
    ) {
    } else if (
      chosenTeams.includes(team) &&
      chosenGroup?.teams &&
      chosenGroup.teams.includes(team)
    ) {
      const groupTeams = [...chosenGroup.teams];
      chosenGroup.teams = groupTeams.filter(
        (groupTeam) => groupTeam.id !== team.id
      );
      setChosenTeams(
        chosenTeams.filter((chosenTeam) => chosenTeam.id !== team.id)
      );
    } else if (
      chosenGroup?.teamsQtt &&
      chosenGroup?.teams &&
      chosenGroup.teamsQtt > chosenGroup?.teams.length
    ) {
      chosenGroup?.teams.push(team);
      setChosenTeams([...chosenTeams, team]);
    }
  };

  const handleChooseGroup = (group: GroupData) => {
    setChosenGroup(group);
  };

  const handleAcceptTeams = () => {
    console.log(
      groupStage?.initGroupMatches(teams, groupStage.groups, tournament, false)
    );
    setChosenGroup(undefined);
  };

  if (!teams.length) {
    return (
      <div>
        <p>Nie ma zespołów</p>
      </div>
    );
  }

  if (chosenGroup !== undefined) {
    return (
      <>
        {chosenGroup.name}
        <GroupsChooseTeamsList
          teams={teams}
          chosenTeams={chosenTeams}
          handleChooseTeam={handleChooseTeam}
          handleAcceptTeams={handleAcceptTeams}
        />
      </>
    );
  }

  return (
    <div>
      <GroupsCreateCreateMenu
        submitGroups={submitGroups}
        cancelCreation={cancelCreation}
        drawGroupsMatches={drawGroupsMatches}
        addGroup={addGroup}
        removeGroup={removeGroup}
      />
      {groups.length ? (
        <GroupList groups={groups} handleChooseGroup={handleChooseGroup} />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGroup: (
      tournamentId: Id,
      group: GroupDataDb,
      matches?: MatchDataDb[]
    ) => dispatch(createGroup(tournamentId, group, matches)),
  };
};
export default connect(null, mapDispatchToProps)(GroupsCreate);
