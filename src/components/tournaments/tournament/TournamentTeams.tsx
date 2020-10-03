import React from "react";
import { Id } from "../../../const/structuresConst";
import { TeamData } from "../../../models/teamData";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

type Props = {
  tournamentId: Id;
  teams: TeamData[];
};

const TournamentTeams: React.FC<Props> = ({ teams, tournamentId }) => {
  return (
    <>
      <TeamList teams={teams} />
      <AddTeam tournamentId={tournamentId} />
    </>
  );
};

export default TournamentTeams;
