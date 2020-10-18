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
import GameDetails from "./components/games/GameDetails";

const App = () => {
  return (
    <BrowserRouter>
      <BodyContainer>
        <Navbar />
        <Switch>
          <MainContainer>
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
              path={routerConstString.bracket}
              component={GameDetails}
            />
            <Route
              path={routerConstString.create}
              component={CreateTournament}
            />
            <Route
              path={routerConstString.login}
              component={SignIn}
            />
            <Route
              path={routerConstString.signUp}
              component={SignUp}
            />
          </MainContainer>
        </Switch>
        <BottomNav />
      </BodyContainer>
    </BrowserRouter>
  );
};

export default App;
