import React from "react";
import { TeamData } from "../../../models/teamData";

import {
  ChooseTeamContainer,
  ChooseTeamName,
} from "../../../styled/styledGroup";

export interface GroupsChooseTeamsListProps {
  teams: TeamData[];
  chosenTeams: TeamData[];
  handleChooseTeam: (team: TeamData) => void;
  handleAcceptTeams: () => void;
}

const GroupsChooseTeamsList: React.FC<GroupsChooseTeamsListProps> = ({
  teams,
  chosenTeams,
  handleChooseTeam,
  handleAcceptTeams,
}) => {
  return (
    <div>
      <p onClick={handleAcceptTeams}>Accept</p>
      {teams.map((team) => (
        <ChooseTeamContainer key={team.id} chosen={chosenTeams.includes(team)}>
          <ChooseTeamName>{team.name}</ChooseTeamName>
          <div
            onClick={() => {
              handleChooseTeam(team);
            }}
          >
            {chosenTeams.includes(team) ? "Remove" : "Add"}
          </div>
        </ChooseTeamContainer>
      ))}
    </div>
  );
};

export default GroupsChooseTeamsList;
