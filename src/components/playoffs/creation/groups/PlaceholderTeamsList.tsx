import React from "react";

import { NewPlaceholder } from "../../../../NewModels/Team";
import { TeamListStyled } from "../../../../styled/styledTeams";
import PlaceholderTeamsListElement from "./PlaceholderTeamsListElement";

export interface PlaceholderTeamsListProps {
  teams: NewPlaceholder[];
}

const PlaceholderTeamsList: React.FC<PlaceholderTeamsListProps> = ({
  teams,
}) => {
  return (
    <TeamListStyled>
      {teams?.map((team: NewPlaceholder) => (
        <PlaceholderTeamsListElement key={team.id + team.place} team={team} />
      ))}
    </TeamListStyled>
  );
};

export default PlaceholderTeamsList;
