import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import BottomNav from "./components/nav/BottomNav";
import Navbar from "./components/nav/Navbar";
import CreateTournament from "./components/tournaments/create/CreateTournament";
import TournamentsDashboard from "./components/tournaments/TournamentsDashboard";
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
import PlayOffsGroupDetails from "./components/playoffs/groups/GroupDetails";
import { Hidden, useMediaQuery } from "@material-ui/core";
import { BodyContainer } from "./styled/styledLayout";
import { MainContainer } from "./styled/styledComponents/styledLayout";
import EditTournament from "./components/tournaments/edit/EditTournament";

const App = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <BrowserRouter>
      <BodyContainer sm={matches}>
        <Navbar />
        <MainContainer>
          <Switch>
            <Route
              path={routerConstString.createGroups}
              component={CreateGroupsScreen}
            />
            <Route
              path={routerConstString.createPlayOffsGroups}
              component={CreatePlayOffsGroupPage}
            />
            <Route exact path={routerConstString.login} component={SignIn} />
            <Route exact path={routerConstString.signUp} component={SignUp} />
            <Route
              exact
              path={routerConstString.create}
              component={CreateTournament}
            />
            <Route
              exact
              path={routerConstString.edit}
              component={EditTournament}
            />
            <Route
              path={routerConstString.matchGroup}
              component={MatchDetails}
            />
            <Route
              path={routerConstString.matchPlayOffsGroup}
              component={MatchDetails}
            />
            <Route
              path={routerConstString.matchPlayOffs}
              component={MatchDetails}
            />
            <Route exact path={"/"} component={TournamentsDashboard} />
            <Switch>
              <Route
                path={routerConstString.playOffsGroup}
                component={PlayOffsGroupDetails}
              />
              <Route path={routerConstString.group} component={GroupDetails} />
              <Route
                path={routerConstString.tournament + "/:tournamentId"}
                component={TournamentDetails}
              />
            </Switch>
          </Switch>
        </MainContainer>
        <Hidden mdUp>
          <BottomNav />
        </Hidden>
      </BodyContainer>
      <InProgress />
      <Notification />
    </BrowserRouter>
  );
};

export default App;
