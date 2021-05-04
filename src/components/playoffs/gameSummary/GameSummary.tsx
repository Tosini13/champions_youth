import React, { useEffect, useState } from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import GameContent from "./GameContent";
import { LOCALE } from "../../../locale/config";
import {
  getImage,
  getImageJustUploaded,
} from "../../tournaments/actions/getImage";
import { Id } from "../../../const/structuresConst";
import Logo, { SIZE_LOGO } from "../../global/Logo";
import GameHeader from "./GameHeader";
import {
  AwayLogoContainer,
  HomeLogoContainer,
} from "../../../styled/styledComponents/match/styledLogo";
import { Game } from "../../../models/gameData";
import GameDetails from "./GameDetails";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { TeamData } from "../../../models/teamData";
import { Match } from "../../../models/matchData";
import { MatchModel } from "../../../NewModels/Matches";
import { MatchData } from "../../../structures/match";
import GameDetailsContainer from "./GameDetailsContainer";

export interface GameSummaryProps {
  game: Game;
  locale: LOCALE;
  tournamentId: Id;
}

const GameSummary: React.FC<GameSummaryProps> = ({
  game,
  locale,
  tournamentId,
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
      <div onClick={() => setOpenDetails(true)}>
        <MatchContainer>
          <HomeLogoContainer>
            <Logo src={imageHome} size={SIZE_LOGO.md} />
          </HomeLogoContainer>
          <MatchContentContainer>
            <GameHeader locale={locale} round={game.round} />
            <GameContent game={game} />
          </MatchContentContainer>
          <AwayLogoContainer>
            <Logo src={imageAway} size={SIZE_LOGO.md} />
          </AwayLogoContainer>
        </MatchContainer>
      </div>
      {openDetails ? (
        <GameDetailsContainer
          locale={locale}
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

export default GameSummary;
