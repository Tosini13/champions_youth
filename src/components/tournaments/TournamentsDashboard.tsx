import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import moment, { Moment } from "moment";

import { TournamentData } from "../../models/tournamentData";
import { routerConstString } from "../../const/menuConst";
import { UserData } from "../../models/credentialsData";
import { Id } from "../../const/structuresConst";
import SplashScreen from "../global/SplashScreen";
import { Divider, Grid, Hidden } from "@material-ui/core";
import LeftBottomNav, { LEFT_VIEW } from "../nav/bottomNav/LeftBottomNav";
import styled from "styled-components";
import RightBottomNav, { RIGHT_VIEW } from "../nav/bottomNav/RightBottomNav";
import TournamentSummaryContainer, {
  TournamentsSummaryUserContainer,
} from "./TournamentSummaryContainer";
import DateNav from "../nav/DateNav";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  SectionContentStyled,
  SectionFooterStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../styled/styledLayout";

const GridMainContainer = styled(Grid)`
  height: 100%;
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
  setSelectedDate: (menu: Moment) => void;
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
      case routerConstString.matches:
        return this.props.liveTournaments;
      case routerConstString.my:
        return this.props.myTournaments;
      case routerConstString.favorites:
        return this.props.favoriteTournaments;
      default:
        return this.props.tournaments;
    }
  };

  handleGetMobileView = () => {
    const mobileView =
      this.props.location.pathname + this.props.location.search;
    if (
      mobileView === routerConstString.my ||
      mobileView === routerConstString.favorites
    ) {
      return (
        <TournamentsSummaryUserContainer
          handleRedirectLogin={this.handleRedirectLogin}
          {...this.props}
          tournaments={this.handleGetTournamentsView()}
        />
      );
    }
    return (
      <TournamentSummaryContainer
        handleRedirectLogin={this.handleRedirectLogin}
        {...this.props}
        tournaments={this.handleGetTournamentsView()}
      />
    );
  };

  handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      this.props.setSelectedDate(date);
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
      <>
        <Hidden mdUp>
          <SectionContentStyled navQty={2}>
            {this.handleGetMobileView()}
          </SectionContentStyled>
        </Hidden>
        <Hidden smDown>
          <GridMainContainer container>
            <Grid item style={{ flexGrow: 1 }}>
              <SectionStyled>
                <SectionNavStyled>
                  <Grid container alignItems="center" justify="space-between">
                    <DateNav
                      isDateActive={true}
                      selectedDate={this.props.selectedDate}
                      handleDateChange={this.handleDateChange}
                      setSelectedDate={this.props.setSelectedDate}
                    />
                    <Grid item xs={1}></Grid>
                  </Grid>
                </SectionNavStyled>
                <SectionContentStyled navQty={2}>
                  <TournamentSummaryContainer
                    handleRedirectLogin={this.handleRedirectLogin}
                    {...this.props}
                    tournaments={
                      this.state.leftView === LEFT_VIEW.TOURNAMENTS
                        ? tournaments
                        : liveTournaments
                    }
                  />
                </SectionContentStyled>
                <SectionFooterStyled>
                  <LeftBottomNav
                    value={this.state.leftView}
                    setValue={(leftView: number) =>
                      this.setState({
                        ...this.state,
                        leftView,
                      })
                    }
                  />
                </SectionFooterStyled>
              </SectionStyled>
            </Grid>
            <Divider orientation="vertical" />
            <Grid item style={{ flexGrow: 1 }}>
              <SectionStyled>
                <SectionContentStyled navQty={1}>
                  <TournamentsSummaryUserContainer
                    handleRedirectLogin={this.handleRedirectLogin}
                    {...this.props}
                    tournaments={
                      this.state.rightView === RIGHT_VIEW.MY
                        ? myTournaments
                        : favoriteTournaments
                    }
                  />
                </SectionContentStyled>
                <SectionFooterStyled>
                  <RightBottomNav
                    value={this.state.rightView}
                    setValue={(rightView: number) =>
                      this.setState({
                        ...this.state,
                        rightView,
                      })
                    }
                  />
                </SectionFooterStyled>
              </SectionStyled>
            </Grid>
          </GridMainContainer>
        </Hidden>
      </>
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

  const { tournaments, liveTournaments, myTournaments, favoriteTournaments } =
    getFilteredTournaments(allTournaments ?? [], selectedDate, user);

  return {
    tournaments,
    liveTournaments,
    myTournaments,
    favoriteTournaments,
    user,
    menu: state.menu,
    selectedDate,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedDate: (selectedDate: Moment) =>
      dispatch(setSelectedDate(selectedDate)),
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
