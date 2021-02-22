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
import { GroupModel } from "../../../NewModels/Group";
import { Grid, Hidden } from "@material-ui/core";
import TournamentDetailsDesktop from "./TournamentDetailsDesktop";

type Props = {
  tournament?: TournamentData;
  teams?: TeamData[];
  groups?: Group[];
  playOffsGroups?: GroupModel[];
  playOffs?: Game[];
  tournamentId?: Id;
  authorId?: Id;
  isOwner: boolean;
  setBack: (route: routerConstString) => void;
};

const TournamentDetails: React.FC<Props> = ({
  authorId,
  isOwner,
  tournamentId,
  tournament,
  teams,
  groups,
  playOffs,
  playOffsGroups,
}) => {
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    if (tournament?.image && authorId) {
      const image = getImage(tournament.image, authorId);
      setImage(image);
    }
  }, [tournament, authorId]);

  const [view, setView] = useState(menuTournamentConst.info);
  if (tournament && teams) {
    return (
      <>
        <Hidden mdUp>
          <Grid container direction="column">
            <Grid item>
              <TournamentMenu view={view} setView={setView} />
            </Grid>
            <Grid item>
              <ContentContainerStyled>
                {view === menuTournamentConst.groups && tournament ? (
                  <TournamentGroups
                    tournamentId={tournamentId}
                    tournament={tournament}
                    groups={groups}
                    playOffs={Boolean(playOffs?.length)}
                    playOffsGroups={Boolean(playOffsGroups?.length)}
                    teams={teams}
                    isOwner={isOwner}
                  />
                ) : null}
                {view === menuTournamentConst.playoffs &&
                tournament &&
                playOffs ? (
                  <TournamentPlayOffs
                    tournamentId={tournamentId}
                    tournament={tournament}
                    playOffs={playOffs}
                    playOffsGroups={playOffsGroups}
                    teams={teams}
                    groups={groups}
                    isOwner={isOwner}
                  />
                ) : null}
                {view === menuTournamentConst.info && tournament ? (
                  <TournamentInfo
                    tournament={tournament}
                    image={image}
                    isOwner={isOwner}
                    tournamentId={tournamentId}
                  />
                ) : null}
                {view === menuTournamentConst.teams && tournament ? (
                  <TournamentTeams
                    teams={teams}
                    isOwner={isOwner}
                    isCreated={Boolean(playOffs?.length || groups?.length)}
                  />
                ) : null}
              </ContentContainerStyled>
            </Grid>
          </Grid>
        </Hidden>
        <TournamentDetailsDesktop
          authorId={authorId}
          isOwner={isOwner}
          tournamentId={tournamentId}
          tournament={tournament}
          teams={teams}
          groups={groups}
          playOffs={playOffs}
          playOffsGroups={playOffsGroups}
          image={image}
        />
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
  const isOwner = tournament && tournament.ownerId === authorId;
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
  const playOffsGroups: GroupModel[] = state.firestore.ordered.playOffsGroups;
  return {
    isOwner,
    authorId,
    tournament,
    teams,
    playOffs,
    playOffsGroups,
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
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          { collection: "playOffsGroups", orderBy: ["name", "asc"] },
        ],
        storeAs: "playOffsGroups",
      },
    ];
  })
)(TournamentDetails);
