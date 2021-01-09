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
import InProgress from "./components/global/InProgress";
import Notification from "./components/global/Notification";
import CreateGroupsScreen from "./components/groups/creation/CreateGroupsScreen";
import CreatePlayOffsGroupPage from "./components/playoffs/creation/groups/CreatePlayOffsGroupPage";

const App = () => {
  return (
    <BrowserRouter>
      <BodyContainer>
        <Navbar />
        <MainContainer>
          <Switch>
            <Route path={routerConstString.createGroups} component={CreateGroupsScreen} />
            <Route path={routerConstString.createPlayOffsGroups} component={CreatePlayOffsGroupPage} />
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
              exact
              path={routerConstString.create}
              component={CreateTournament}
            />
            <Route
              path={routerConstString.matchGroup}
              component={MatchDetails}
            />
            <Route
              path={routerConstString.matchPlayOffs}
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
          </Switch>
        </MainContainer>
        <BottomNav />
      </BodyContainer>
      <InProgress />
      <Notification />
    </BrowserRouter>
  );
};

export default App;
