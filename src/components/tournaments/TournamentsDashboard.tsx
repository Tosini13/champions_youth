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
import SplashScreen from "../global/SplashScreen";
import { Divider, Grid, Hidden } from "@material-ui/core";
import LeftBottomNav, { LEFT_VIEW } from "../nav/bottomNav/LeftBottomNav";
import styled from "styled-components";
import RightBottomNav, { RIGHT_VIEW } from "../nav/bottomNav/RightBottomNav";
import TournamentSummaryContainer from "./TournamentSummaryContainer";

const GridMainContainer = styled(Grid)`
  height: 100%;
`;

const GridSideContainer = styled(Grid)`
  height: 100%;
`;

const GridContent = styled(Grid)`
  flex-grow: 1;
`;

const getFilteredTournaments = (
  tournaments: TournamentData[],
  selectedDate: Moment,
  user?: UserData
) => {
  let allTournaments: TournamentData[] = [];
  let liveTournaments: TournamentData[] = [];
  let myTournaments: TournamentData[] = [];
  let favoriteTournaments: TournamentData[] = [];
  tournaments.forEach((tournament) => {
    if (moment(selectedDate).isSame(moment(tournament.date), "day")) {
      allTournaments.push(tournament);
    }
    if (moment(selectedDate).isSame(moment(tournament.date), "hour")) {
      liveTournaments.push(tournament);
    }
    if (tournament.ownerId === user?.id) {
      myTournaments.push(tournament);
    }
    if (user?.favoriteTournaments?.includes(tournament.id)) {
      favoriteTournaments.push(tournament);
    }
  });
  return {
    tournaments: allTournaments,
    liveTournaments,
    myTournaments,
    favoriteTournaments,
  };
};

interface IState {
  leftView: LEFT_VIEW;
  rightView: RIGHT_VIEW;
}

type TProps = {
  user?: UserData;
  tournaments?: TournamentData[];
  liveTournaments?: TournamentData[];
  myTournaments?: TournamentData[];
  favoriteTournaments?: TournamentData[];
  history: any;
  location: any;
  selectedDate: Moment;
  locale: LOCALE;
};

class TournamentsDashboard extends Component<TProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      leftView: LEFT_VIEW.TOURNAMENTS,
      rightView: RIGHT_VIEW.FAVORITE,
    };
  }

  handleRedirectLogin = () => {
    this.props.history.push(routerConstString.login);
  };

  handleGetTournamentsView = () => {
    switch (this.props.location.pathname + this.props.location.search) {
      case routerConstString.live:
        return this.props.liveTournaments;
      case routerConstString.my:
        return this.props.myTournaments;
      case routerConstString.favorites:
        return this.props.favoriteTournaments;
      default:
        return this.props.tournaments;
    }
  };

  render() {
    const {
      tournaments,
      liveTournaments,
      myTournaments,
      favoriteTournaments,
      user,
    } = this.props;
    if (
      tournaments === undefined &&
      liveTournaments === undefined &&
      myTournaments === undefined &&
      favoriteTournaments === undefined &&
      user !== undefined
    )
      return <SplashScreen />;
    return (
      <Rosetta
        translations={tournamentDashboardDict}
        locale={this.props.locale}
      >
        <>
          <Hidden mdUp>
            <TournamentSummaryContainer
              handleRedirectLogin={this.handleRedirectLogin}
              {...this.props}
              tournaments={this.handleGetTournamentsView()}
            />
          </Hidden>
          <Hidden smDown>
            <GridMainContainer container>
              <Grid item style={{ flexGrow: 1 }}>
                <GridSideContainer container direction="column">
                  <GridContent item>
                    <TournamentSummaryContainer
                      handleRedirectLogin={this.handleRedirectLogin}
                      {...this.props}
                      tournaments={
                        this.state.leftView === LEFT_VIEW.TOURNAMENTS
                          ? tournaments
                          : liveTournaments
                      }
                    />
                  </GridContent>
                  <Grid item>
                    <LeftBottomNav
                      value={this.state.leftView}
                      setValue={(leftView: number) =>
                        this.setState({
                          ...this.state,
                          leftView,
                        })
                      }
                    />
                  </Grid>
                </GridSideContainer>
              </Grid>
              <Divider orientation="vertical" />
              <Grid item style={{ flexGrow: 1 }}>
                <GridSideContainer container direction="column">
                  <GridContent item>
                    <TournamentSummaryContainer
                      handleRedirectLogin={this.handleRedirectLogin}
                      {...this.props}
                      tournaments={
                        this.state.rightView === RIGHT_VIEW.MY
                          ? myTournaments
                          : favoriteTournaments
                      }
                    />
                  </GridContent>
                  <Grid item>
                    <RightBottomNav
                      value={this.state.rightView}
                      setValue={(rightView: number) =>
                        this.setState({
                          ...this.state,
                          rightView,
                        })
                      }
                    />
                  </Grid>
                </GridSideContainer>
              </Grid>
            </GridMainContainer>
          </Hidden>
        </>
      </Rosetta>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  let allTournaments: TournamentData[] | undefined =
    state.firestore.ordered.tournaments;
  const users: UserData[] | undefined = state.firestore.ordered.users;
  const userId: Id | undefined = state.firebase.auth.uid;
  const user: UserData | undefined = users?.find((user) => user.id === userId);
  const selectedDate: Moment = state.menu.selectedDate;

  const {
    tournaments,
    liveTournaments,
    myTournaments,
    favoriteTournaments,
  } = getFilteredTournaments(allTournaments ?? [], selectedDate, user);

  return {
    tournaments,
    liveTournaments,
    myTournaments,
    favoriteTournaments,
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
