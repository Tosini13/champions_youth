import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import moment, { Moment } from "moment";

import Button from "@material-ui/core/Button";

import { NoContentTitle, NoContentContainer } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { UserData } from "../../models/credentialsData";
import { Id } from "../../const/structuresConst";
import { setActiveDate } from "../../store/actions/MenuActions";

const getFilteredTournaments = (
  view: routerConstString,
  tournaments: TournamentData[],
  selectedDate: Moment,
  user?: UserData
) => {
  switch (view) {
    case routerConstString.my:
      if (!user) return [];
      return tournaments?.filter(
        (tournament: TournamentData) => tournament.owner === user.id?.toString()
      );
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
  setActiveDate: (active: boolean) => void;
};

class TournamentsDashboard extends Component<Props> {
  handleRedirectLogin = () => {
    this.props.history.push(routerConstString.login);
  };

  componentDidMount() {
    this.props.setActiveDate(true);
  }

  componentWillUnmount() {
    this.props.setActiveDate(false);
  }

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
              Aby dodać turniej musisz być zalogowany!
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setActiveDate: (active: boolean) => dispatch(setActiveDate(active)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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
