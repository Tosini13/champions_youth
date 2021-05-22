import React, { useEffect, useState } from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import GameContent from "./GameContent";
import {
  getImage,
  getImageJustUploaded,
} from "../../tournaments/actions/getImage";
import { Id } from "../../../const/structuresConst";
import Logo, { SIZE_LOGO, TeamLogo } from "../../global/Logo";
import GameHeader from "./GameHeader";
import {
  AwayLogoContainer,
  HomeLogoContainer,
} from "../../../styled/styledComponents/match/styledLogo";
import { Game } from "../../../models/gameData";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { TeamData } from "../../../models/teamData";
import { MatchData } from "../../../structures/match";
import GameDetailsContainer from "./GameDetailsContainer";

export interface GameSummaryProps {
  game: Game;
  tournamentId: Id;
  match?: MatchData;
  returnMatch?: MatchData;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  game,
  tournamentId,
  match,
  returnMatch,
}) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [imageHome, setImageHome] = useState<any>(null);
  const [imageAway, setImageAway] = useState<any>(null);

  useEffect(() => {
    if (game.homeTeam?.logo) {
      getImage(game.homeTeam?.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && game.homeTeam?.logo) {
            img =
              getImageJustUploaded(game.homeTeam?.logo, tournamentId) ??
              undefined;
          }
          setImageHome(img);
        })
        .catch((err) => console.log("err", err));
    }

    if (game.awayTeam?.logo) {
      getImage(game.awayTeam?.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && game.awayTeam?.logo) {
            img =
              getImageJustUploaded(game.awayTeam?.logo, tournamentId) ??
              undefined;
          }
          setImageAway(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [game, tournamentId]);

  return (
    <>
      <div
        onClick={() => setOpenDetails(true)}
        style={{ marginBottom: "10px" }}
      >
        <MatchContainer>
          <HomeLogoContainer>
            <TeamLogo teamLogo={game.homeTeam?.logo} size={SIZE_LOGO.md} />
          </HomeLogoContainer>
          <MatchContentContainer>
            <GameHeader round={game.round} />
            <GameContent game={game} match={match} returnMatch={returnMatch} />
          </MatchContentContainer>
          <AwayLogoContainer>
            <TeamLogo teamLogo={game.awayTeam?.logo} size={SIZE_LOGO.md} />
          </AwayLogoContainer>
        </MatchContainer>
      </div>
      {openDetails ? (
        <GameDetailsContainer
          tournamentId={tournamentId}
          open={openDetails}
          game={game}
          gameId={game.id}
          handleClose={() => setOpenDetails(false)}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const gameId = ownProps.gameId;
  const bracketMatches = `matches${gameId}`;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData = state.firestore.data[bracketMatches]?.match;
  const returnMatchData = state.firestore.data[bracketMatches]?.returnMatch;
  const match: MatchData | undefined =
    matchData && teams
      ? {
          ...matchData,
          home: teams.find((team) => team.id === matchData.home),
          away: teams.find((team) => team.id === matchData.away),
        }
      : undefined;

  const returnMatch: MatchData | undefined =
    returnMatchData && teams
      ? {
          ...returnMatchData,
          home: teams.find((team) => team.id === returnMatchData.home),
          away: teams.find((team) => team.id === returnMatchData.away),
        }
      : undefined;
  return {
    match,
    returnMatch,
    gameId: ownProps.gameId,
    tournamentId: ownProps.tournamentId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.tournamentId,
        subcollections: [
          {
            collection: "playOffs",
            doc: props.gameId,
            subcollections: [
              { collection: "matches", orderBy: ["date", "asc"] },
            ],
          },
        ],
        storeAs: `matches${props.gameId}`,
      },
    ];
  })
)(GameSummary);
