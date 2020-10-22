import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match, MatchDataDb } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";

type Props = {
  matchData?: Match;
  open: boolean;
  setOpen: (open: boolean) => void;
  gameIsFinished?: () => boolean;
};

const MatchDetails: React.FC<Props> = ({ matchData }) => {
  if (matchData === undefined) return <div>Splash</div>;
  return (
    <>
      <MatchDetailsDisplay match={matchData} />
      <MatchDetailsDashboard match={matchData} />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const matchId = ownProps.match.params.matchId;
  const matches: MatchDataDb[] | undefined = state.firestore.ordered.matches;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData =
    matches && matchId && teams
      ? new Match(matches[matchId], teams)
      : undefined;
  return {
    matchData,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    console.log(props);
    const tournamentId = props.match.params.tournamentId;
    const groupId = props.match.params.groupId;
    console.log(tournamentId, groupId);
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
