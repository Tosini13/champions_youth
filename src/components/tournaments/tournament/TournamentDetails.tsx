import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { routerConstString } from "../../../const/menuConst";
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
import { getImage, getImageJustUploaded } from "../actions/getImage";
import SplashScreen from "../../global/SplashScreen";
import { GroupModel } from "../../../NewModels/Group";
import { Hidden } from "@material-ui/core";
import TournamentDetailsDesktop from "./TournamentDetailsDesktop";
import TournamentNav from "./nav/TournamentNav";
import {
  E_TOURNAMENT_MENU,
  useTournamentNav,
} from "../../../hooks/useTournamentNavs";

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
  const { getLocalStorageTournamentNav, clearLocalStorageGroupNav } =
    useTournamentNav();
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    clearLocalStorageGroupNav();
  }, [clearLocalStorageGroupNav]);

  useEffect(() => {
    if (tournament?.image && tournamentId && authorId) {
      getImage(tournament.image, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && tournament.image) {
            img = getImageJustUploaded(tournament.image, authorId) ?? undefined;
          }
          setImage(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [tournament, tournamentId, authorId]);

  const [view, setView] = useState(
    getLocalStorageTournamentNav() || E_TOURNAMENT_MENU.INFO
  );

  if (tournament && teams) {
    return (
      <>
        <Hidden mdUp>
          <SectionStyled>
            <SectionNavStyled>
              <TournamentNav value={view} setValue={setView} />
            </SectionNavStyled>
            <SectionContentStyled style={{ padding: "5px" }}>
              {view === E_TOURNAMENT_MENU.GROUPS &&
              tournament &&
              tournamentId ? (
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
              {view === E_TOURNAMENT_MENU.PLAY_OFFS &&
              tournament &&
              playOffs &&
              tournamentId ? (
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
              {view === E_TOURNAMENT_MENU.INFO && tournament && tournamentId ? (
                <TournamentInfo
                  tournament={tournament}
                  image={image}
                  isOwner={isOwner}
                  tournamentId={tournamentId}
                />
              ) : null}
              {view === E_TOURNAMENT_MENU.TEAMS && tournament ? (
                <TournamentTeams
                  teams={teams}
                  isOwner={isOwner}
                  isCreated={Boolean(playOffs?.length || groups?.length)}
                />
              ) : null}
            </SectionContentStyled>
          </SectionStyled>
        </Hidden>
        <Hidden smDown>
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
        </Hidden>
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
  const tournament: TournamentData | undefined = tournaments
    ? {
        ...tournaments[tournamentId],
        id: tournamentId,
      }
    : undefined;
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
