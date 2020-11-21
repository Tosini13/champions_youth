import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import { GroupTeamText, GroupTitleText } from "../../styled/styledGroup";
import { Id } from "../../const/structuresConst";
import { MatchData } from "../../structures/match";
import { TeamData } from "../../models/teamData";
import { Match, MatchDataDb } from "../../structures/dbAPI/matchData";
import { Group, GroupDataDb } from "../../models/groupData";
import { routerGenerateConst } from "../../const/menuConst";
import { LinkStyled } from "../../styled/styledLayout";
import SplashScreen from "../global/SplashScreen";
import MatchSummary from "../matches/MatchSummary/MatchSummary";
import { Button } from "@material-ui/core";
import GroupTable from "./details/GroupTable";
import { getPromoted } from "../../structures/groupPromotion";
import { updateGame, UpdateGame } from "../../store/actions/GameActions";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";
import { updateGroupMode } from "../../store/actions/GroupActions";
import { matchGame } from "../../store/actions/PlayOffsActions";

export interface GroupsComponentProps {
  tournamentId: Id;
  groupId: Id;
  group: Group;
  matches: MatchData[];
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
    homeTeam,
    awayTeam,
  }: UpdateMatch) => void;
  updateGame: ({
    tournamentId,
    gameId,
    homeTeam,
    awayTeam,
    returnMatch,
  }: UpdateGame) => void;
  updateGroupMode: (tournamentId: Id, groupId: Id, finished: boolean) => void;
}

const GroupDetails: React.FC<GroupsComponentProps> = ({
  tournamentId,
  groupId,
  group,
  matches,
  updateMatch,
  updateGame,
  updateGroupMode,
}) => {
  const handleFinishGroup = () => {
    const promoted = getPromoted(group.teams, matches);
    group.playOffs?.forEach((promotedTeam) => {
      let homeTeam = undefined;
      let awayTeam = undefined;
      const teamId = promoted[promotedTeam.place - 1];
      if (promotedTeam.home) {
        homeTeam = teamId;
      } else {
        awayTeam = teamId;
      }
      if (teamId) {
        updateGroupMode(tournamentId, groupId, true);
        updateGame({
          tournamentId,
          gameId: promotedTeam.gameId,
          homeTeam,
          awayTeam,
          returnMatch: false,
        });
        updateMatch({
          tournamentId,
          gameId: promotedTeam.gameId,
          matchId: matchGame.match,
          homeTeam,
          awayTeam,
        });
      }
    });
  };

  const handleContinueGroup = () => {
    const promoted = getPromoted(group.teams, matches);
    group.playOffs?.forEach((promotedTeam) => {
      let homeTeam: undefined | null = undefined;
      let awayTeam: undefined | null = undefined;
      const teamId = promoted[promotedTeam.place - 1];
      if (promotedTeam.home) {
        homeTeam = null;
      } else {
        awayTeam = null;
      }
      if (teamId) {
        updateGroupMode(tournamentId, groupId, false);
        updateGame({
          tournamentId,
          gameId: promotedTeam.gameId,
          homeTeam,
          awayTeam,
          returnMatch: false,
        });
        updateMatch({
          tournamentId,
          gameId: promotedTeam.gameId,
          matchId: matchGame.match,
          homeTeam,
          awayTeam,
        });
      }
    });
  };

  if (!group || !matches) return <SplashScreen />;
  return (
    <>
      <GroupTable
        matches={matches}
        teams={group.teams}
        promotedQtt={group.playOffs ? group.playOffs.length : 1}
      />
      <Grid
        container
        justify="space-between"
        direction="column"
        alignItems="stretch"
        style={{ marginTop: "10px" }}
      >
        <Grid item>
          <GroupTitleText>{group.name}</GroupTitleText>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            {group.teams?.map((team) => (
              <GroupTeamText key={team.id}>{team.name}</GroupTeamText>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <List>
            {matches?.map((match) => (
              <LinkStyled
                key={match.id}
                to={routerGenerateConst.matchGroup(
                  tournamentId,
                  groupId,
                  match.id
                )}
              >
                <MatchSummary match={match} />
              </LinkStyled>
            ))}
          </List>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              {group.finished === true ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "0px auto" }}
                  onClick={handleContinueGroup}
                >
                  Continue Group
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ margin: "0px auto" }}
                  onClick={handleFinishGroup}
                >
                  Finish Group
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.tournamentId;
  const groupId = ownProps.match.params.groupId;
  const matchesData: MatchDataDb[] | undefined =
    state.firestore.ordered.matches;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const groupsData: GroupDataDb[] | undefined = state.firestore.ordered.groups;
  const groupData = groupsData?.find((data) => data.id === groupId);
  const group = groupData && teams ? new Group(groupData, teams) : undefined;
  const matches =
    matchesData && teams
      ? matchesData.map((matchData) => new Match(matchData, teams))
      : undefined; //put it to some class?!?!
  return {
    tournamentId,
    groupId,
    group,
    matches,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateMatch: ({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
      homeTeam,
      awayTeam,
    }: UpdateMatch) =>
      dispatch(
        updateMatch({
          tournamentId,
          groupId,
          gameId,
          matchId,
          mode,
          result,
          homeTeam,
          awayTeam,
        })
      ),
    updateGame: ({
      tournamentId,
      gameId,
      homeTeam,
      awayTeam,
      returnMatch,
    }: UpdateGame) =>
      dispatch(
        updateGame({
          tournamentId,
          gameId,
          homeTeam,
          awayTeam,
          returnMatch,
        })
      ),
    updateGroupMode: (tournamentId: Id, groupId: Id, finished: boolean) =>
      dispatch(updateGroupMode(tournamentId, groupId, finished)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams" }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "groups" }],
        storeAs: "groups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          {
            collection: "groups",
            doc: props.match.params.groupId,
            subcollections: [
              { collection: "matches", orderBy: ["date", "asc"] },
            ],
          },
        ],
        storeAs: "matches",
      },
    ];
  })
)(GroupDetails);
