import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import BottomNav from "./components/nav/BottomNav";
import Navbar from "./components/nav/Navbar";
import CreateTournament from "./components/tournaments/CreateTournament";
import TournamentsDashboard from "./components/tournaments/TournamentsDashboard";
import { BodyContainer, MainContainer } from "./styled/styledLayout";
import { routerConstString } from "./const/menuConst";
import TournamentDetails from "./components/tournaments/tournament/TournamentDetails";

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
            <Route path={routerConstString.live}>
              <TournamentsDashboard view={routerConstString.live} />
            </Route>
            <Route path={routerConstString.my}>
              <TournamentsDashboard view={routerConstString.my} />
            </Route>
            <Route path={routerConstString.favorites}>
              <TournamentsDashboard view={routerConstString.favorites} />
            </Route>
            <Route path={routerConstString.tournament + "/:id"} component={TournamentDetails} />
            <Route
              path={routerConstString.create}
              component={CreateTournament}
            />
          </MainContainer>
        </Switch>
        <BottomNav />
      </BodyContainer>
    </BrowserRouter>
  );
};

export default App;
