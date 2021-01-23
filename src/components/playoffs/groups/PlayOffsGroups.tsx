import React from "react";
import { Group } from "../../../models/groupData";
import { TeamData } from "../../../models/teamData";
import { GroupModel } from "../../../NewModels/Group";
import GroupSummary from "./GroupSummary";

export interface PlayOffsGroupsProps {
  playOffsGroups?: GroupModel[];
  groups?: Group[];
  teams: TeamData[];
}

const PlayOffsGroups: React.FC<PlayOffsGroupsProps> = ({
  playOffsGroups,
  groups,
  teams,
}) => {
  return (
    <>
      {playOffsGroups?.map((group) => (
        <GroupSummary
          key={group.id}
          group={group}
          groups={groups}
          teams={teams}
        />
      ))}
    </>
  );
};

export default PlayOffsGroups;
