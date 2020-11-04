import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";
import { Id } from "../../const/structuresConst";
import SplashScreen from "../global/SplashScreen";
import { matchModeConst } from "../../const/matchConst";
import { updateGroupMatchMode } from "../../store/actions/MatchActions";

type Props = {
  matchData: Match;
  authorId: Id;
  tournamentId: Id;
  groupId: Id;
  gameId: Id;
  matchId: Id;
  updateGroupMatchMode: (
    tournamentId: Id,
    groupId: Id,
    matchId: Id,
    mode: matchModeConst
  ) => void;
};

const MatchDetails: React.FC<Props> = ({
  matchData,
  authorId,
  tournamentId,
  groupId,
  gameId,
  matchId,
  updateGroupMatchMode,
}) => {
  if (matchData === undefined) return <SplashScreen />;

  const updateMode = (mode: matchModeConst) => {
    console.log(matchData);
    updateGroupMatchMode(tournamentId, groupId, matchId, mode);
  };
  return (
    <>
      <MatchDetailsDisplay match={matchData} authorId={authorId} />
      <MatchDetailsDashboard match={matchData} updateMode={updateMode} />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { tournamentId, groupId, gameId, matchId } = ownProps.match.params;
  const authorId = state.firebase.auth.uid;
  const matches = state.firestore.data.matches;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const match = matches ? matches[matchId] : undefined;
  const matchData = match && teams ? new Match(match, teams) : undefined;
  return {
    matchData,
    authorId,
    tournamentId,
    groupId,
    gameId,
    matchId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateGroupMatchMode: (
      tournamentId: Id,
      groundId: Id,
      matchId: Id,
      mode: matchModeConst
    ) => dispatch(updateGroupMatchMode(tournamentId, groundId, matchId, mode)),
  };
};

export default compose(
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams" }],
        storeAs: "teams",
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
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MatchDetails);
