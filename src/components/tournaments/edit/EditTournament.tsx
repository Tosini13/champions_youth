import { CircularProgress } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Id } from "../../../const/structuresConst";
import { TournamentData } from "../../../models/tournamentData";
import CreateTournament from "../create/CreateTournament";

export interface EditTournamentProps {
  authorId?: Id;
  tournament?: TournamentData;
  tournamentId?: Id;
}

const EditTournament: React.FC<EditTournamentProps> = ({ tournament }) => {
  if (!tournament) {
    return <CircularProgress />;
  }
  return (
    <>
      <CreateTournament tournamentData={tournament} />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = state.firebase.auth.uid;
  const tournamentId = ownProps.match.params.tournamentId;
  const tournaments = state.firestore.data.tournaments;
  const tournament: TournamentData | undefined = tournaments
    ? {
        ...tournaments[tournamentId],
        id: tournamentId,
      }
    : undefined;
  return {
    authorId,
    tournament,
    tournamentId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [{ collection: "tournaments" }];
  })
)(EditTournament);
