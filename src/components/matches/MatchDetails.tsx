import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";
import { Id, Result } from "../../const/structuresConst";
import SplashScreen from "../global/SplashScreen";
import { matchModeConst } from "../../const/matchConst";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";

type Props = {
  matchData: Match;
  authorId: Id;
  tournamentId: Id;
  groupId: Id;
  gameId: Id;
  matchId: Id;
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
  }: UpdateMatch) => void;
};

const MatchDetails: React.FC<Props> = ({
  matchData,
  authorId,
  tournamentId,
  groupId,
  gameId,
  matchId,
  updateMatch,
}) => {
  if (matchData === undefined) return <SplashScreen />;

  const updateMode = (mode: matchModeConst) => {
    console.log(gameId, groupId);
    updateMatch({ tournamentId, groupId, gameId, matchId, mode });
  };

  const updateResult = (result: Result) => {
    console.log(gameId, groupId);
    updateMatch({ tournamentId, groupId, gameId, matchId, result });
  };

  const resetMatch = () => {
    const mode = matchModeConst.notStarted;
    const result: Result = {
      home: 0,
      away: 0,
    };
    console.log(gameId, groupId);
    updateMatch({ tournamentId, groupId, gameId, matchId, mode, result });
  };

  return (
    <>
      <MatchDetailsDisplay match={matchData} authorId={authorId} />
      <MatchDetailsDashboard
        match={matchData}
        updateMode={updateMode}
        updateResult={updateResult}
        resetMatch={resetMatch}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { tournamentId, groupId, gameId, matchId } = ownProps.match.params;
  const authorId = state.firebase.auth.uid;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;

  const matches = state.firestore.data.matches;
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
    updateMatch: ({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
    }: UpdateMatch) =>
      dispatch(
        updateMatch({ tournamentId, groupId, gameId, matchId, mode, result })
      ),
  };
};

export default compose(
  firestoreConnect((props: any) => {
    if (props.match.params.groupId) {
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
    }
    if (props.match.params.gameId) {
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
              collection: "playOffs",
              doc: props.match.params.gameId,
              subcollections: [{ collection: "matches" }],
            },
          ],
          storeAs: "matches",
        },
      ];
    }
    return [];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MatchDetails);
