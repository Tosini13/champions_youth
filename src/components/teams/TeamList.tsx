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
  deleteTeamFromTournament: (tournamentId: Id, teamId: Id) => void;
  editTeamFromTournament: (tournamentId: Id, team: TeamData) => void;
  authorId: Id;
};

const TeamList: React.FC<Props> = ({
  teams,
  deleteTeamFromTournament,
  editTeamFromTournament,
  authorId,
}) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const handleDeleteTeam = (team: TeamData) => {
    deleteTeamFromTournament(tournamentId, team.id);
  };

  const handleEditTeam = (team: TeamData) => {
    editTeamFromTournament(tournamentId, team);
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
            authorId={authorId}
          />
        );
      })}
    </TeamListStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    authorId: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTeamFromTournament: (tournamentId: Id, teamId: Id) =>
      dispatch(deleteTeamFromTournament(tournamentId, teamId)),
    editTeamFromTournament: (tournamentId: Id, team: TeamData) =>
      dispatch(editTeamFromTournament(tournamentId, team)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
