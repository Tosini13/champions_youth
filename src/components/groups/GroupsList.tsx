import React from "react";

import List from "@material-ui/core/List";
import GroupSummary from "./GroupSummary";
import { Group } from "../../models/groupData";
import { Grid } from "@material-ui/core";

export interface GroupListProps {
  groups?: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <Grid container direction="column" spacing={4}>
      {groups?.map((group) => (
        <Grid item key={group.id}>
          <GroupSummary group={group} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupList;
