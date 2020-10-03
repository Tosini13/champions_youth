import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";

type Props = {
  view?: routerConstString;
  tournaments: TournamentData[];
};

class TournamentsDashboard extends Component<Props> {
  filterTournaments = () => {
    switch (this.props.view) {
      case routerConstString.live:
        return [];
      case routerConstString.my:
        return [];
      case routerConstString.favorites:
        return [];
      default:
        return [];
    }
  };
  render() {
    const { tournaments } = this.props;
    return (
      <div>
        {!tournaments?.length ? (
          <NoContentTitle>Brak turniejów</NoContentTitle>
        ) : null}
        {tournaments?.map((tournament: TournamentData) => (
          <TournamentSummary key={tournament.id} tournament={tournament} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const tournaments = state.firestore.ordered.tournaments;
  return {
    tournaments,
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
    ];
  })
)(TournamentsDashboard);
