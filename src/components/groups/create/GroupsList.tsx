import React from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

import MatchSummaryMock from "../../matches/MatchSummaryMock";
import {
  GroupTitleText,
  GroupTeamText,
  GroupContainer,
  GroupHeaderContainer,
} from "../../../styled/styledGroup";
import { GroupData } from "../../../models/groupData";

export interface GroupListProps {
  groups: GroupData[];
  handleChooseGroup: (group: GroupData) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, handleChooseGroup }) => {
  return (
    <List style={{ color: "white" }}>
      {groups.map((group) => (
        <GroupContainer key={group.id}>
          <GroupHeaderContainer>
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
          </GroupHeaderContainer>
          <List>
            {group.matches?.map((match) => (
              <div key={match.id}>
                <MatchSummaryMock match={match} teams={group.teams} />
              </div>
            ))}
          </List>
          <Button
            variant="outlined"
            color="secondary"
            style={{ width: "100%" }}
            onClick={() => {
              handleChooseGroup(group);
            }}
          >
            Dodaj
          </Button>
        </GroupContainer>
      ))}
    </List>
  );
};

export default GroupList;
