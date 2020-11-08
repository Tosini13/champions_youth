import React from "react";
import { GameStructure } from "../../structures/game";
import {
  GamesContainerStyled,
  CurrentGameStyled,
  GameStyled,
  PreviousGamesContainerStyled,
  NextGamesContainerStyled,
  GameCaption,
  GameTitle,
} from "../../styled/styledGame";

type Props = {
  game: GameStructure;
  setCurrentMatch: (match: GameStructure) => void;
};

const GameSummaryLinks: React.FC<Props> = ({ game, setCurrentMatch }) => {
  const getLink = (match: GameStructure | undefined, title: string) => {
    return match ? (
      <GameStyled onClick={() => setCurrentMatch(match)}>
        <GameCaption>{title}:</GameCaption>
        <GameTitle>{match.round}</GameTitle>
      </GameStyled>
    ) : null;
  };

  return (
    <GamesContainerStyled>
      <PreviousGamesContainerStyled>
        {getLink(game.previousMatchHome, "Previous match home")}
        {getLink(game.previousMatchAway, "Previous match away")}
      </PreviousGamesContainerStyled>
      <CurrentGameStyled>
        <GameTitle>{game.round}</GameTitle>
      </CurrentGameStyled>
      <NextGamesContainerStyled>
        {getLink(game.winnerMatch, "Winner match")}
        {getLink(game.loserMatch, "Loser match")}
      </NextGamesContainerStyled>
    </GamesContainerStyled>
  );
};

export default GameSummaryLinks;
