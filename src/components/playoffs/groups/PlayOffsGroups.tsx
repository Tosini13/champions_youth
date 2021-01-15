import React from "react";
import { GroupModel } from "../../../NewModels/Group";
import GroupSummary from "./GroupSummary";

export interface PlayOffsGroupsProps {
  groups?: GroupModel[];
}

const PlayOffsGroups: React.FC<PlayOffsGroupsProps> = ({ groups }) => {
  return (
    <>
      {groups?.map((group) => (
        <GroupSummary key={group.id} group={group} />
      ))}
    </>
  );
};

export default PlayOffsGroups;
