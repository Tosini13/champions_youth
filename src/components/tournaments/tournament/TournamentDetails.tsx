import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { ContentContainerStyled } from "../../../styled/styledLayout";
import { menuTournamentConst } from "../../../const/menuConst";
import TournamentMenu from "./TournamentMenu";
import TournamentTeams from "./TournamentTeams";
// import TournamentPlayOffs from "./TournamentPlayOffs";
// import TournamentGroups from "./TournamentGroups";
import { TeamData } from "../../../models/teamData";
import { GameData } from "../../../models/gameData";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";

type Props = {
  tournament: TournamentData;
  teams: TeamData[];
  playoffs: GameData[];
  tournamentId: Id;
};

const TournamentDetails: React.FC<Props> = ({
  tournamentId,
  tournament,
  teams,
  playoffs,
}) => {
  const [view, setView] = useState(menuTournamentConst.teams);
  return (
    <>
      <TournamentMenu view={view} setView={setView} />
      <ContentContainerStyled>
        {/* {view === menuTournamentConst.groups && tournament ? (
          <TournamentGroups tournament={tournament} />
        ) : null}
        {view === menuTournamentConst.playoffs && tournament && playoffs ? (
          <TournamentPlayOffs tournament={tournament} playoffs={playoffs} />
        ) : null} */}
        {view === menuTournamentConst.teams && tournament ? (
          <TournamentTeams tournamentId={tournamentId} teams={teams} />
        ) : null}
      </ContentContainerStyled>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const tournamentId = ownProps.match.params.id;
  const tournaments = state.firestore.data.tournaments;
  const tournament = tournaments ? tournaments[tournamentId] : null;
  const teams = state.firestore.ordered.teams;
  const playoffs = state.firestore.ordered.playoffs;
  return {
    tournament,
    teams,
    playoffs,
    tournamentId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
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
        subcollections: [{ collection: "playoffs", orderBy: ["id", "asc"] }],
        storeAs: "playoffs",
      },
    ];
  })
)(TournamentDetails);
