import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";

type Props = {
  userId?: Id;
  tournaments: TournamentData[];
};

class TournamentsDashboard extends Component<Props> {
  render() {
    const { tournaments, userId } = this.props;
    return (
      <div>
        {!tournaments?.length ? (
          <NoContentTitle>Brak turniejów</NoContentTitle>
        ) : null}
        {tournaments?.map((tournament: TournamentData) => (
          <TournamentSummary
            key={tournament.id}
            tournament={tournament}
            userId={userId}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  let tournaments = state.firestore.ordered.tournaments;
  const userId = state.firebase.auth.uid;
  if (
    routerConstString.my === ownProps.match.path &&
    tournaments?.length &&
    userId
  ) {
    tournaments = tournaments.filter(
      (tournament: TournamentData) => tournament.ownerId === userId.toString()
    );
  }
  return {
    tournaments,
    userId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "tournaments",
        orderBy: ["date", "desc"],
      },
      {
        collection: "users",
      },
    ];
  })
)(TournamentsDashboard);
