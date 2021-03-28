import React from "react";
import { Id } from "../../../../const/structuresConst";

import { TeamData } from "../../../../models/teamData";
import { TeamListStyled } from "../../../../styled/styledTeams";
import GroupTeamsListElement from "./GroupTeamsListElement";

export interface GroupTeamsListProps {
  teams: TeamData[];
  userId: Id;
  tournamentId: Id;
}

const GroupTeamsList: React.FC<GroupTeamsListProps> = ({
  userId,
  teams,
  tournamentId,
}) => {
  return (
    <TeamListStyled>
      {teams?.map((team: TeamData) => (
        <GroupTeamsListElement
          key={team.id}
          team={team}
          userId={userId}
          tournamentId={tournamentId}
        />
      ))}
    </TeamListStyled>
  );
};

export default GroupTeamsList;
