import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match, MatchDataDb } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";
import { Id } from "../../const/structuresConst";

type Props = {
  matchData?: Match;
  open: boolean;
  setOpen: (open: boolean) => void;
  gameIsFinished?: () => boolean;
  authorId: Id;
};

const MatchDetails: React.FC<Props> = ({ matchData, authorId }) => {
  console.log(matchData?.id);
  if (matchData === undefined) return <div>Splash</div>;
  return (
    <>
      <MatchDetailsDisplay match={matchData} authorId={authorId} />
      <MatchDetailsDashboard match={matchData} />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = state.firebase.auth.uid;
  const matchId = ownProps.match.params.matchId;
  const matches: MatchDataDb[] | undefined = state.firestore.ordered.matches;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const match = matches?.find(
    (match) => match.id?.toString() === matchId.toString()
  );
  const matchData = match && teams ? new Match(match, teams) : undefined;
  return {
    matchData,
    authorId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    const tournamentId = props.match.params.tournamentId;
    const groupId = props.match.params.groupId;
    return [
      {
        collection: "tournaments",
        doc: tournamentId,
        subcollections: [
          {
            collection: "groups",
            doc: groupId,
            subcollections: [{ collection: "matches" }],
          },
        ],
        storeAs: "matches",
      },
      {
        collection: "tournaments",
        doc: tournamentId,
        subcollections: [{ collection: "teams" }],
        storeAs: "teams",
      },
    ];
  })
)(MatchDetails);
