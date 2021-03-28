import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { Id } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
import {
  deleteTeamFromTournament,
  editTeamFromTournament,
} from "../../store/actions/TeamActions";
import { TeamListStyled } from "../../styled/styledTeams";

import TeamSummary from "./TeamSummary";

type Props = {
  teams?: TeamData[];
  deleteTeamFromTournament: (tournamentId: Id, team: TeamData) => void;
  editTeamFromTournament: (tournamentId: Id, team: TeamData) => void;
  userId: Id;
  isOwner: boolean;
  isCreated: boolean;
};

const TeamList: React.FC<Props> = ({
  teams,
  deleteTeamFromTournament,
  editTeamFromTournament,
  userId,
  isOwner,
  isCreated,
}) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const handleDeleteTeam = (team: TeamData) => {
    deleteTeamFromTournament(tournamentId, team);
  };

  const handleEditTeam = (team: TeamData) => {
    editTeamFromTournament(tournamentId, team);
  };

  return (
    <TeamListStyled>
      {teams?.map((team: TeamData) => (
        <TeamSummary
          key={team.id}
          team={team}
          handleDeleteTeam={handleDeleteTeam}
          handleEditTeam={handleEditTeam}
          userId={userId}
          isOwner={isOwner}
          isCreated={isCreated}
          tournamentId={tournamentId}
        />
      ))}
    </TeamListStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userId: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTeamFromTournament: (tournamentId: Id, team: TeamData) =>
      dispatch(deleteTeamFromTournament(tournamentId, team)),
    editTeamFromTournament: (tournamentId: Id, team: TeamData) =>
      dispatch(editTeamFromTournament(tournamentId, team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
