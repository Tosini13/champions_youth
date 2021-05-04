import React, { useEffect, useState } from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import { MatchData } from "../../../structures/match";
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
  console.log("game1", game);
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
  );
};

export default GameSummary;
