import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import BottomNav from "./components/nav/BottomNav";
import Navbar from "./components/nav/Navbar";
import CreateTournament from "./components/tournaments/create/CreateTournament";
import TournamentsDashboard from "./components/tournaments/TournamentsDashboard";
import { BodyContainer, MainContainer } from "./styled/styledLayout";
import { routerConstString } from "./const/menuConst";
import TournamentDetails from "./components/tournaments/tournament/TournamentDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import GroupDetails from "./components/groups/GroupDetails";
import MatchDetails from "./components/matches/MatchDetails";

const App = () => {
  return (
    <BrowserRouter>
      <BodyContainer>
        <Navbar />
        <MainContainer>
          <Switch>
            <Route
              exact
              path={routerConstString.login}
              component={SignIn}
            />
            <Route
              exact
              path={routerConstString.signUp}
              component={SignUp}
            />
            <Route
              path={routerConstString.matchGroup}
              component={MatchDetails}
            />
            <Route
              exact
              path={routerConstString.tournaments}
              component={TournamentsDashboard}
            />
            <Route path={routerConstString.live} component={TournamentsDashboard} />
            <Route path={routerConstString.my} component={TournamentsDashboard} />
            <Route path={routerConstString.favorites} component={TournamentsDashboard} />
            <Switch>
              <Route path={routerConstString.group} component={GroupDetails} />
              <Route path={routerConstString.tournament + "/:tournamentId"} component={TournamentDetails} />
            </Switch>
            <Route
              path={routerConstString.create}
              component={CreateTournament}
            />
          </Switch>
        </MainContainer>
        <BottomNav />
      </BodyContainer>
    </BrowserRouter>
  );
};

export default App;
