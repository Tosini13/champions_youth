import React from "react";
import { Group } from "../../models/groupData";

import GroupList from "./GroupsList";

export interface GroupsComponentProps {
  groups?: Group[];
}

const GroupsComponent: React.FC<GroupsComponentProps> = ({ groups }) => {
  return <GroupList groups={groups} />;
};

export default GroupsComponent;
