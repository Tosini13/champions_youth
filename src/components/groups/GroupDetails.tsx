import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Id } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
import SplashScreen from "../global/SplashScreen";
import {
  updateGame,
  UpdateGame,
  resetNextGames,
  TResetNextGames,
} from "../../store/actions/GameActions";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";
import {
  updateGroupMode,
  updatePlayOffsGroupTeams,
  UpdatePlayOffsGroupTeamsParams,
} from "../../store/actions/GroupActions";
import { GroupModel, GroupModelDB } from "../../NewModels/Group";
import { MatchModel, MatchModelDB } from "../../NewModels/Matches";
import GroupDetailsView from "./details/GroupDetailsView";
import { TournamentData } from "../../models/tournamentData";

export interface GroupsComponentProps {
  isOwner: boolean;
  tournamentId: Id;
  groupId: Id;
  group?: GroupModel;
  playOffsGroups?: GroupModel[];
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
  resetNextGames: ({ tournamentId, teamsId, gamesId }: TResetNextGames) => void;
}

const GroupDetails: React.FC<GroupsComponentProps> = ({
  isOwner,
  tournamentId,
  groupId,
  group,
  updateMatch,
  updateGame,
  updateGroupMode,
  updatePlayOffsGroupTeams,
  resetNextGames,
  playOffsGroups,
}) => {
  if (!group || !groupId || groupId !== group.id) return <SplashScreen />;
  return (
    <GroupDetailsView
      isOwner={isOwner}
      tournamentId={tournamentId}
      groupId={groupId}
      group={group}
      playOffsGroups={playOffsGroups}
      updateMatch={updateMatch}
      updateGame={updateGame}
      updateGroupMode={updateGroupMode}
      updatePlayOffsGroupTeams={updatePlayOffsGroupTeams}
      resetNextGames={resetNextGames}
    />
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = state.firebase.auth.uid;
  const tournamentId = ownProps.match.params.tournamentId;
  const tournaments = state.firestore.data.tournaments;
  const tournament: TournamentData | undefined = tournaments
    ? {
        ...tournaments[tournamentId],
        id: tournamentId,
      }
    : undefined;
  const isOwner: boolean = Boolean(
    tournament && tournament.ownerId === authorId
  );
  const groupId = ownProps.match.params.groupId;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchesData: MatchModelDB[] | undefined =
    state.firestore.ordered[`matches_${groupId}`];
  const matches: MatchModel[] | undefined =
    matchesData && teams
      ? matchesData.map((matchData) => ({
          ...matchData,
          home: teams.find((team) => team.id === matchData.home),
          away: teams.find((team) => team.id === matchData.away),
        }))
      : undefined;
  const groups: GroupModelDB[] | undefined = state.firestore.ordered.groups;
  const groupData = groups?.find((data) => data.id === groupId);
  const group: GroupModel | undefined =
    groupData && teams && matches
      ? {
          id: groupData.id,
          name: groupData.name,
          teams: teams.filter((team) => groupData.teams.includes(team.id)),
          matches: matches,
          finishAt: groupData.finishAt,
          finished: groupData.finished,
          playOffs: groupData.playOffs,
          playOffsGroup: groupData.playOffsGroup,
          promoted: groupData.promoted,
        }
      : undefined;
  const playOffsGroups: GroupModel[] = state.firestore.ordered.playOffsGroups;
  return {
    isOwner,
    tournamentId,
    groupId,
    group,
    playOffsGroups,
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
    resetNextGames: ({ tournamentId, teamsId, gamesId }: TResetNextGames) =>
      dispatch(resetNextGames({ tournamentId, teamsId, gamesId })),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
      },
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
        subcollections: [
          {
            collection: "groups",
            doc: props.match.params.groupId,
            subcollections: [{ collection: "matches" }],
          },
        ],
        storeAs: `matches_${props.match.params.groupId}`,
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          { collection: "playOffsGroups", orderBy: ["name", "asc"] },
        ],
        storeAs: "playOffsGroups",
      },
    ];
  })
)(GroupDetails);
