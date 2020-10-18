import React from "react";
import { TeamData } from "../../../models/teamData";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

type Props = {
  teams?: TeamData[];
};

const TournamentTeams: React.FC<Props> = ({ teams }) => {
  return (
    <>
      <AddTeam />
      <TeamList teams={teams} />
    </>
  );
};

export default TournamentTeams;
