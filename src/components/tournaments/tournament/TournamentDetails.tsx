import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { ContentContainerStyled } from "../../../styled/styledLayout";
import {
  menuTournamentConst,
  routerConstString,
} from "../../../const/menuConst";
import TournamentMenu from "./TournamentMenu";
import TournamentTeams from "./TournamentTeams";
import TournamentGroups from "./TournamentGroups";
import { TeamData } from "../../../models/teamData";
import { Game } from "../../../models/gameData";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import TournamentInfo from "./TournamentInfo";
import { Group, GroupDataDb } from "../../../models/groupData";
import TournamentPlayOffs from "./TournamentPlayOffs";
import { GameDataDb } from "../../../structures/dbAPI/gameData";
import { getImage } from "../actions/getImage";
import SplashScreen from "../../global/SplashScreen";

type Props = {
  tournament?: TournamentData;
  teams?: TeamData[];
  groups?: Group[];
  playOffs?: Game[];
  tournamentId?: Id;
  authorId?: Id;
  setBack: (route: routerConstString) => void;
};

const TournamentDetails: React.FC<Props> = ({
  authorId,
  tournamentId,
  tournament,
  teams,
  groups,
  playOffs,
}) => {
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    if (tournament?.image && authorId) {
      const image = getImage(tournament.image, authorId);
      setImage(image);
    }
  }, [tournament, authorId]);

  const [view, setView] = useState(menuTournamentConst.playoffs);
  if (tournament && teams) {
    return (
      <>
        <TournamentMenu view={view} setView={setView} />
        <ContentContainerStyled>
          {view === menuTournamentConst.groups && tournament ? (
            <TournamentGroups
              tournament={tournament}
              groups={groups}
              teams={teams}
            />
          ) : null}
          {view === menuTournamentConst.playoffs && tournament && playOffs ? (
            <TournamentPlayOffs
              tournament={tournament}
              playOffs={playOffs}
              teams={teams}
              groups={groups}
            />
          ) : null}
          {view === menuTournamentConst.info && tournament ? (
            <TournamentInfo tournament={tournament} image={image} />
          ) : null}
          {view === menuTournamentConst.teams && tournament ? (
            <TournamentTeams teams={teams} />
          ) : null}
        </ContentContainerStyled>
      </>
    );
  } else {
    return <SplashScreen />;
  }
};

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = state.firebase.auth.uid;
  const tournamentId = ownProps.match.params.tournamentId;
  const tournaments = state.firestore.data.tournaments;
  const tournament = tournaments ? tournaments[tournamentId] : null;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const groupsData: GroupDataDb[] | undefined = state.firestore.ordered.groups;
  const groups =
    groupsData && teams
      ? groupsData.map((groupData) => new Group(groupData, teams))
      : undefined; //put it to some class?!?!
  const playOffsData: GameDataDb[] | undefined =
    state.firestore.ordered.playOffs;
  const playOffs =
    playOffsData && teams
      ? playOffsData.map((game) => new Game(game, teams))
      : undefined;
  return {
    authorId,
    tournament,
    teams,
    playOffs,
    tournamentId,
    groups,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [
      { collection: "tournaments" },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "teams", orderBy: ["name", "asc"] }],
        storeAs: "teams",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "groups", orderBy: ["name", "asc"] }],
        storeAs: "groups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "playOffs", orderBy: ["order", "asc"] }],
        storeAs: "playOffs",
      },
    ];
  })
)(TournamentDetails);
