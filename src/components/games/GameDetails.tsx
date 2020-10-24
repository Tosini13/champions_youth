import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { MatchData } from "../../structures/match";
import { Match } from "../../models/matchData";
import { TeamData } from "../../models/teamData";
import MatchSummaryMock from "../matches/MatchSummaryMock";
import { DialogStyled, DialogTitle } from "../../styled/styledLayout";

type Props = {
  handleClose: () => void;
  open: boolean;
  match?: MatchData;
  returnMatch?: MatchData;
};

const GameDetails: React.FC<Props> = ({
  handleClose,
  open,
  match,
  returnMatch,
}) => {
  return (
    <DialogStyled
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {match ? (
        <>
          <DialogTitle>{match.round}</DialogTitle>
          <MatchSummaryMock match={match} />
        </>
      ) : null}
    </DialogStyled>
  );
};

const mapStateToProps = (state: any) => {
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData = state.firestore.data.bracketMatches
    ? state.firestore.data.bracketMatches.match
    : undefined;
  const returnMatchData = state.firestore.data.bracketMatches
    ? state.firestore.data.bracketMatches.returnMatch
    : undefined;

  const match = matchData && teams ? new Match(matchData, teams) : undefined;
  const returnMatch =
    returnMatchData && teams ? new Match(returnMatchData, teams) : undefined;
  return {
    match,
    returnMatch,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.tournamentId,
        subcollections: [
          {
            collection: "playOffs",
            doc: props.gameId,
            subcollections: [
              { collection: "matches", orderBy: ["date", "asc"] },
            ],
          },
        ],
        storeAs: "bracketMatches",
      },
    ];
  })
)(GameDetails);
