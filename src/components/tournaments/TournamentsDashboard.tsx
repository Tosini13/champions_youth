import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Button from "@material-ui/core/Button";

import { NoContentTitle, NoContentContainer } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { UserData } from "../../models/credentialsData";
import { Id } from "../../const/structuresConst";

const getFilteredTournaments = (
  view: routerConstString,
  tournaments: TournamentData[],
  user?: UserData
) => {
  switch (view) {
    case routerConstString.my:
      if (!user) return [];
      return tournaments?.filter(
        (tournament: TournamentData) =>
          tournament.ownerId === user.id?.toString()
      );
    case routerConstString.favorites:
      if (!user) return [];
      return tournaments?.filter((tournament: TournamentData) =>
        user.favoriteTournaments?.includes(tournament.id)
      );
    case routerConstString.live:
      return [];
    default:
      return tournaments;
  }
};

type Props = {
  user?: UserData;
  tournaments?: TournamentData[];
  history: any;
};

class TournamentsDashboard extends Component<Props> {
  handleRedirectLogin = () => {
    this.props.history.push(routerConstString.login);
  };

  render() {
    const { tournaments, user } = this.props;
    return (
      <div>
        {!tournaments?.length && user ? (
          <NoContentTitle>Brak turniejów</NoContentTitle>
        ) : null}
        {!tournaments?.length && !user ? (
          <NoContentContainer>
            <NoContentTitle>
              Aby dodać turniej do musisz być zalogowany!
            </NoContentTitle>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.handleRedirectLogin}
            >
              Zaloguj
            </Button>
          </NoContentContainer>
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
  let tournaments: TournamentData[] | undefined =
    state.firestore.ordered.tournaments;
  const users: UserData[] | undefined = state.firestore.ordered.users;
  const userId: Id | undefined = state.firebase.auth.uid;
  const user: UserData | undefined = users?.find((user) => user.id === userId);

  if (tournaments) {
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
