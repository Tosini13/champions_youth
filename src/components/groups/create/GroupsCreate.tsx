import React, { useState } from "react";

import GroupsCreateCreateMenu from "./GroupsCreateCreateMenu";
import GroupList from "./GroupsList";
import GroupsChooseTeamsList from "./GroupsChooseTeamsList";
import { TeamData } from "../../../models/teamData";
import { GroupStage } from "../../../structures/groupStage";
import { TournamentData } from "../../../models/tournamentData";
import { GroupData } from "../../../models/groupData";

type Props = {
  tournament: TournamentData;
  groupStage: GroupStage;
  teams: TeamData[];
  toggleCreate: () => void;
};

const GroupsCreate: React.FC<Props> = ({
  tournament,
  groupStage,
  teams,
  toggleCreate,
}) => {
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [chosenGroup, setChosenGroup] = useState<GroupData>();
  const [groups, setGroups] = useState<GroupData[]>([]);

  const submitGroups = () => {
    toggleCreate();
  };

  const cancelCreation = () => {
    toggleCreate();
  };

  const drawGroupsMatches = () => {
    if (groupStage.groups.length) {
      setGroups(
        groupStage.createRandomGroups(
          teams,
          groupStage.groups.length,
          tournament,
          false
        )
      );
    }
  };

  const addGroup = () => {
    if (
      groupStage &&
      groupStage.groups.length < Math.ceil(teams.length / 2) - 1
    ) {
      setChosenTeams([]);
      groupStage?.createGroups(teams, groupStage.groups.length + 1);
    }
  };

  const removeGroup = () => {
    if (groupStage && groupStage.groups.length > 1) {
      setChosenTeams([]);
      groupStage?.createGroups(teams, groupStage.groups.length - 1);
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
    groupStage?.initGroupMatches(teams, groupStage.groups, tournament, false);
    setChosenGroup(undefined);
  };

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
      {groupStage.groups.length ? (
        <GroupList
          groups={groupStage.groups}
          handleChooseGroup={handleChooseGroup}
        />
      ) : null}
    </div>
  );
};

export default GroupsCreate;
