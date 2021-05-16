import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { Id } from "../../const/structuresConst";
import { TeamData } from "../../models/teamData";
import { deleteTeamFromTournament } from "../../store/actions/TeamActions";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";

import TeamForm from "./TeamForm";
import { TeamsList } from "../../styled/styledComponents/teams/styledLayout";
import TeamSummary from "./TeamSummary";

type Props = {
  teams?: TeamData[];
  deleteTeamFromTournament: (tournamentId: Id, team: TeamData) => void;
  userId: Id;
  isOwner: boolean;
  isCreated: boolean;
};

const TeamList: React.FC<Props> = ({
  teams,
  deleteTeamFromTournament,
  userId,
  isOwner,
  isCreated,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamData | undefined>();
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const handleDeleteTeam = (team: TeamData) => {
    deleteTeamFromTournament(tournamentId, team);
  };

  const handleClose = () => {
    setSelectedTeam(undefined);
  };

  return (
    <TeamsList>
      {teams?.map((team: TeamData) => (
        <TeamSummary
          key={team.id}
          team={team}
          handleDeleteTeam={() => handleDeleteTeam(team)}
          handleEditTeam={() => setSelectedTeam(team)}
          userId={userId}
          isOwner={isOwner}
          isCreated={isCreated}
          tournamentId={tournamentId}
        />
      ))}
      <DialogRU
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={Boolean(selectedTeam)}
        color="primary"
        title={"addTeam"}
      >
        <TeamForm handleClose={handleClose} selectedTeam={selectedTeam} />
      </DialogRU>
    </TeamsList>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
