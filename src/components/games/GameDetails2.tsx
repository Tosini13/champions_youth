import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MatchData } from "../../structures/match";
import { Match } from "../../models/matchData";
import { TeamData } from "../../models/teamData";
import MatchSummaryMock from "../matches/MatchSummaryMock";
import { GameSummaryContainerStyled, GameTitle } from "../../styled/styledGame";

type Props = {
  handleClose: () => void;
  open: boolean;
  match?: MatchData;
  returnMatch?: MatchData;
};

const GameDetails2: React.FC<Props> = ({
  handleClose,
  open,
  match,
  returnMatch,
}) => {
  console.log(match);
  return (
    <GameSummaryContainerStyled
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {match ? (
        <>
          <GameTitle>{match.round}</GameTitle>
          <MatchSummaryMock match={match} />
        </>
      ) : null}
    </GameSummaryContainerStyled>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
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
    console.log(props.gameId);
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
)(GameDetails2);
