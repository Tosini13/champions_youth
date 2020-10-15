import React from "react";

import List from "@material-ui/core/List";
import GroupSummary from "./GroupSummary";
import { Group } from "../../models/groupData";

export interface GroupListProps {
  groups?: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <List style={{ color: "white" }}>
      {groups?.map((group) => (
        <GroupSummary key={group.id} group={group} />
      ))}
    </List>
  );
};

export default GroupList;
