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
import { updateGroupMode } from "../../../store/actions/GroupActions";

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
}

const PlayOffsGroupDetails: React.FC<GroupsComponentProps> = ({
  tournamentId,
  groupId,
  group,
  updateMatch,
  updateGame,
  updateGroupMode,
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
        }))
      : undefined;
  const groups: GroupModelDB[] | undefined =
    state.firestore.ordered.playOffsGroups;
  console.log(groups);
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
          promoted: groupData.promoted,
        }
      : undefined;
  return {
    tournamentId,
    groupId,
    group,
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
