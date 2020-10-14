import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import { Group, GroupDataDb } from "../../structures/dbAPI/groupData";
import { GroupTeamText, GroupTitleText } from "../../styled/styledGroup";
import MatchSummaryMock from "../matches/MatchSummaryMock";
import { Id } from "../../const/structuresConst";
import { MatchData } from "../../structures/match";
import { TeamData } from "../../models/teamData";
import { Match, MatchDataDb } from "../../structures/dbAPI/matchData";

export interface GroupsComponentProps {
  tournamentId: Id;
  groupId: Id;
  group: Group;
  matches: MatchData[];
}

const GroupDetails: React.FC<GroupsComponentProps> = ({
  tournamentId,
  groupId,
  group,
  matches,
}) => {
  if (!group || !matches) return <p>splash</p>;
  return (
    <div>
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
      <List>
        {matches?.map((match) => (
          <div key={match.id}>
            <MatchSummaryMock match={match} />
          </div>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.id;
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

export default compose(
  connect(mapStateToProps),
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
