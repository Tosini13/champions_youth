import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import GroupsCreateCreateMenu from "./GroupsCreateCreateMenu";
import GroupList from "./GroupsList";
import GroupsChooseTeamsList from "./GroupsChooseTeamsList";
import { TeamData } from "../../../models/teamData";
import { GroupStage } from "../../../structures/groupStage";
import { TournamentData } from "../../../models/tournamentData";
import { GroupData, GroupDataDb } from "../../../models/groupData";
import { createGroup } from "../../../store/actions/GroupActions";
import { MatchDataDb } from "../../../structures/dbAPI/matchData";
import { Id } from "../../../const/structuresConst";
import { useParams } from "react-router-dom";
import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";

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
  locale: LOCALE;
};

const GroupsCreate: React.FC<Props> = ({
  tournament,
  groupStage,
  teams,
  toggleCreate,
  createGroup,
  locale,
}) => {
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [chosenGroup, setChosenGroup] = useState<GroupData>();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const submitGroups = () => {
    const groupsDb = groupStage.convertToDb(groups);
    groupsDb.forEach((group) => {
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
    if (
      groupStage &&
      groupStage.groups.length < Math.ceil(teams.length / 2) - 1
    ) {
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
    setChosenGroup(undefined);
  };

  if (!teams.length) {
    return (
      <Rosetta translations={tournamentDetailsDict} locale={locale}>
        <div>
          <p>
            <Translator id="noTeams" />
          </p>
        </div>
      </Rosetta>
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupsCreate);
