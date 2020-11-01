import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import moment, { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import Button from "@material-ui/core/Button";

import { NoContentTitle, NoContentContainer } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { UserData } from "../../models/credentialsData";
import { Id } from "../../const/structuresConst";
import tournamentDashboardDict from "../../locale/tournamentDashboard";
import { LOCALE } from "../../locale/config";

const getFilteredTournaments = (
  view: routerConstString,
  tournaments: TournamentData[],
  selectedDate: Moment,
  user?: UserData
) => {
  switch (view) {
    case routerConstString.my:
      if (!user) return [];
      return tournaments?.filter((tournament: TournamentData) => {
        return tournament.ownerId === user.id;
      });
    case routerConstString.favorites:
      if (!user) return [];
      return tournaments?.filter((tournament: TournamentData) =>
        user.favoriteTournaments?.includes(tournament.id)
      );
    case routerConstString.live:
      return [];
    default:
      return tournaments?.filter((tournament: TournamentData) =>
        moment(selectedDate).isSame(moment(tournament.date), "day")
      );
  }
};

type Props = {
  user?: UserData;
  tournaments?: TournamentData[];
  history: any;
  selectedDate: Moment;
  locale: LOCALE;
};

class TournamentsDashboard extends Component<Props> {
  handleRedirectLogin = () => {
    this.props.history.push(routerConstString.login);
  };

  render() {
    const { tournaments, user } = this.props;
    return (
      <Rosetta
        translations={tournamentDashboardDict}
        locale={this.props.locale}
      >
        <div>
          {!tournaments?.length && user ? (
            <NoContentTitle>
              <Translator id={"noTournaments"} />
            </NoContentTitle>
          ) : null}
          {!tournaments?.length && !user ? (
            <NoContentContainer>
              <NoContentTitle>
                <Translator id={"mustBeLoggedInToAddTournament"} />
              </NoContentTitle>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleRedirectLogin}
              >
                <Translator id={"logIn"} />
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
      </Rosetta>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  let tournaments: TournamentData[] | undefined =
    state.firestore.ordered.tournaments;
  const users: UserData[] | undefined = state.firestore.ordered.users;
  const userId: Id | undefined = state.firebase.auth.uid;
  const user: UserData | undefined = users?.find((user) => user.id === userId);
  const selectedDate: Moment = state.menu.selectedDate;

  if (tournaments) {
    tournaments = getFilteredTournaments(
      ownProps.match.path,
      tournaments,
      selectedDate,
      user
    );
  }

  return {
    tournaments,
    user,
    selectedDate,
    menu: state.menu,
    locale: state.dictionary.locale,
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
