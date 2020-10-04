import React from "react";

import { TeamData } from "../../models/teamData";
import { TeamListStyled } from "../../styled/styledTeams";

import TeamSummary from "./TeamSummary";

type Props = {
  teams?: TeamData[];
};

const TeamList: React.FC<Props> = ({ teams }) => {
  const handleDeleteTeam = (team: TeamData) => {
    console.log(team);
  };

  const handleEditTeam = (team: TeamData) => {
    console.log(team);
  };

  return (
    <TeamListStyled>
      {teams?.map((team: TeamData) => {
        return (
          <TeamSummary
            key={team.id}
            team={team}
            handleDeleteTeam={handleDeleteTeam}
            handleEditTeam={handleEditTeam}
          />
        );
      })}
    </TeamListStyled>
  );
};

export default TeamList;
