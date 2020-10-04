import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { UserData } from "../../models/credentialsData";

const getFilteredTournaments = (
  view: routerConstString,
  tournaments: TournamentData[],
  user: UserData
) => {
  switch (view) {
    case routerConstString.my:
      return tournaments?.filter(
        (tournament: TournamentData) =>
          tournament.ownerId === user.id?.toString()
      );
    case routerConstString.favorites:
      return tournaments?.filter((tournament: TournamentData) =>
        user.favoriteTournaments?.includes(tournament.id)
      );
    default:
      return tournaments;
  }
};

type Props = {
  user: UserData;
  tournaments: TournamentData[];
};

class TournamentsDashboard extends Component<Props> {
  render() {
    const { tournaments, user } = this.props;
    return (
      <div>
        {!tournaments?.length ? (
          <NoContentTitle>Brak turniejów</NoContentTitle>
        ) : null}
        {tournaments?.map((tournament: TournamentData) => (
          <TournamentSummary
            key={tournament.id}
            tournament={tournament}
            user={user}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  let tournaments = state.firestore.ordered.tournaments;
  const users: UserData[] | undefined = state.firestore.ordered.users;
  const userId = state.firebase.auth.uid;
  const user = users?.find((user) => user.id === userId);

  if (user) {
    tournaments = getFilteredTournaments(
      ownProps.match.path,
      tournaments,
      user
    );
  }

  return {
    tournaments,
    user,
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
