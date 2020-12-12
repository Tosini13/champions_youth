import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Id } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
import SplashScreen from "../global/SplashScreen";
import { updateGame, UpdateGame } from "../../store/actions/GameActions";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";
import { updateGroupMode } from "../../store/actions/GroupActions";
import { GroupModel, GroupModelDB } from "../../NewModels/Group";
import { MatchModel, MatchModelDB } from "../../NewModels/Matches";
import GroupDetailsView from "./details/GroupDetailsView";
import { ContentContainerStyled } from "../../styled/styledLayout";

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

const GroupDetails: React.FC<GroupsComponentProps> = ({
  tournamentId,
  groupId,
  group,
  updateMatch,
  updateGame,
  updateGroupMode,
}) => {
  if (!group) return <SplashScreen />;
  return (
    <ContentContainerStyled>
      <GroupDetailsView
        tournamentId={tournamentId}
        groupId={groupId}
        group={group}
        updateMatch={updateMatch}
        updateGame={updateGame}
        updateGroupMode={updateGroupMode}
      />
    </ContentContainerStyled>
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
        storeAs: "matches",
      },
    ];
  })
)(GroupDetails);
