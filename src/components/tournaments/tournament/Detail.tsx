import React, { useState } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";

import { menuTournamentConst } from "../../../const/menuConst";
import TournamentTeams from "./TournamentTeams";
import TournamentMenu from "./TournamentMenu";
import TournamentPlayOffs from "./TournamentPlayOffs";
import { ContentContainerStyled } from "../../../styled/styledLayout";
import TournamentGroups from "./TournamentGroups";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import { deleteTournament } from "../../../store/actions/TournamentActions";

type Props = {
  tournament: TournamentData;
  tournamentId: Id;
  groups: Id[];
  playOffs: boolean;
};

const TournamentDetails: React.FC<Props> = ({
  tournament,
  tournamentId,
  groups,
  playOffs,
}) => {
  const [view, setView] = useState<menuTournamentConst>(
    menuTournamentConst.info
  );
  console.log(tournament, tournamentId, groups, playOffs);
  return (
    <>
      {/* <TournamentMenu id={tournamentId} view={view} setView={setView} />
      <ContentContainerStyled>
        {view === menuTournamentConst.groups && tournament ? (
          <TournamentGroups tournament={tournament} />
        ) : null}
        {view === menuTournamentConst.playoffs && tournament ? (
          <TournamentPlayOffs tournament={tournament} />
        ) : null}
        {view === menuTournamentConst.teams && tournament ? (
          <TournamentTeams tournament={tournament} />
        ) : null}
      </ContentContainerStyled> */}
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state, ownProps);
  // const tournamentId = ownProps.match.params.id;
  // const tournaments = state.firestore.data.tournaments;
  // const tournament = tournaments ? tournaments[tournamentId] : null;
  // const auth = state.firebase.auth.uid;
  // return {
  //   tournamentId,
  //   menu: state.menu,
  //   tournament: tournament,
  //   teams: state.firestore.ordered.teams,
  //   groups: state.firestore.ordered.groups,
  //   bracket: state.firestore.ordered.bracket,
  //   auth,
  // };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTournament: (tournamentId: any) =>
      dispatch(deleteTournament(tournamentId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    console.log(props);
    return [
      { collection: "tournaments" },
      {
        collection: "tournaments",
        doc: props.match.params.id,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.id,
        subcollections: [{ collection: "groups", orderBy: ["name", "asc"] }],
        storeAs: "groups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.id,
        subcollections: [{ collection: "bracket" }],
        storeAs: "bracket",
      },
    ];
  })
)(TournamentDetails);
