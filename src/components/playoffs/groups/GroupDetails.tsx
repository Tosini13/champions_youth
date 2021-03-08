import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Id } from "../../../const/structuresConst";
import { GroupModel, GroupModelDB } from "../../../NewModels/Group";
import { updateMatch, UpdateMatch } from "../../../store/actions/MatchActions";
import SplashScreen from "../../global/SplashScreen";
import GroupDetailsView from "../../groups/details/GroupDetailsView";
import { TeamData } from "../../../models/teamData";
import { MatchModel, MatchModelDB } from "../../../NewModels/Matches";
import { updateGame, UpdateGame } from "../../../store/actions/GameActions";
import {
  updateGroupMode,
  updatePlayOffsGroupTeams,
  UpdatePlayOffsGroupTeamsParams,
} from "../../../store/actions/GroupActions";

export interface GroupsComponentProps {
  tournamentId: Id;
  groupId: Id;
  group?: GroupModel;
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
    homeTeam,
    awayTeam,
  }: UpdateMatch) => void;
  updateGame: ({
    tournamentId,
    gameId,
    homeTeam,
    awayTeam,
    returnMatch,
  }: UpdateGame) => void;
  updateGroupMode: (tournamentId: Id, groupId: Id, finished: boolean) => void;
  updatePlayOffsGroupTeams: ({
    tournamentId,
    groupId,
    groupTeams,
  }: UpdatePlayOffsGroupTeamsParams) => void;
}

const PlayOffsGroupDetails: React.FC<GroupsComponentProps> = ({
  tournamentId,
  groupId,
  group,
  updateMatch,
  updateGame,
  updateGroupMode,
  updatePlayOffsGroupTeams,
}) => {
  if (!group) return <SplashScreen />;
  return (
    <GroupDetailsView
      tournamentId={tournamentId}
      groupId={groupId}
      group={group}
      updateMatch={updateMatch}
      updateGame={updateGame}
      updateGroupMode={updateGroupMode}
      updatePlayOffsGroupTeams={updatePlayOffsGroupTeams}
    />
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const groupId = ownProps.match.params.groupId;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchesData: MatchModelDB[] | undefined =
    state.firestore.ordered.matches;
  const matches: MatchModel[] | undefined =
    matchesData && teams
      ? matchesData.map((matchData) => ({
          ...matchData,
          home: teams.find((team) => team.id === matchData.home),
          away: teams.find((team) => team.id === matchData.away),
          placeholder: {},
        }))
      : undefined;
  const groups: GroupModelDB[] | undefined = state.firestore.ordered.groups;
  const playOffsGroups: GroupModelDB[] | undefined =
    state.firestore.ordered.playOffsGroups;
  const groupData = playOffsGroups?.find((data) => data.id === groupId);
  const playOffsGroup: GroupModel | undefined =
    groupData && teams && matches
      ? {
          id: groupData.id,
          name: groupData.name,
          teams: teams.filter((team) =>
            groupData?.groupTeams?.find((groupTeam) => groupTeam.id === team.id)
          ),
          matches: matches.map((match) => {
            const homeTeam = groupData?.groupTeams?.find(
              (team) => team.place === match.groupPlaceholder?.home
            );
            const awayTeam = groupData?.groupTeams?.find(
              (team) => team.place === match.groupPlaceholder?.away
            );
            match.placeholder = {
              home: {
                name: `${
                  groups?.find((group) => group.id === homeTeam?.group?.id)
                    ?.name
                }`,
                id: homeTeam?.id,
                place: homeTeam?.group?.place,
              },
              away: {
                name: `${
                  groups?.find((group) => group.id === awayTeam?.group?.id)
                    ?.name
                }`,
                id: awayTeam?.id,
                place: awayTeam?.group?.place,
              },
            };
            match.home = teams.find((team) => team.id === homeTeam?.id);
            match.away = teams.find((team) => team.id === awayTeam?.id);
            return match;
          }),
          finishAt: groupData.finishAt,
          finished: groupData.finished,
          playOffs: groupData.playOffs,
          promoted: groupData.promoted,
          groupTeams: groupData.groupTeams,
        }
      : undefined;
  return {
    tournamentId,
    groupId,
    group: playOffsGroup,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateMatch: ({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
      homeTeam,
      awayTeam,
    }: UpdateMatch) =>
      dispatch(
        updateMatch({
          tournamentId,
          groupId,
          gameId,
          matchId,
          mode,
          result,
          homeTeam,
          awayTeam,
        })
      ),
    updateGame: ({
      tournamentId,
      gameId,
      homeTeam,
      awayTeam,
      returnMatch,
    }: UpdateGame) =>
      dispatch(
        updateGame({
          tournamentId,
          gameId,
          homeTeam,
          awayTeam,
          returnMatch,
        })
      ),
    updateGroupMode: (tournamentId: Id, groupId: Id, finished: boolean) =>
      dispatch(updateGroupMode(tournamentId, groupId, finished)),
    updatePlayOffsGroupTeams: ({
      tournamentId,
      groupId,
      groupTeams,
    }: UpdatePlayOffsGroupTeamsParams) =>
      dispatch(
        updatePlayOffsGroupTeams({
          tournamentId,
          groupId,
          groupTeams,
        })
      ),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "groups" }],
        storeAs: "groups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "playOffsGroups" }],
        storeAs: "playOffsGroups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          {
            collection: "playOffsGroups",
            doc: props.match.params.groupId,
            subcollections: [{ collection: "matches" }],
          },
        ],
        storeAs: "matches",
      },
    ];
  })
)(PlayOffsGroupDetails);
