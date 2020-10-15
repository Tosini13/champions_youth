import React from "react";
import { TeamData } from "../../models/teamData";
import { BracketStructure } from "../../structures/bracket";
import { GameStructure } from "../../structures/game";
import { BracketSectionContainerStyled } from "../../styled/styledBracket";
import GameSummaryRecursive from "../games/GameSummaryRecursive";

type Props = {
  bracket: BracketStructure;
  teams: TeamData[];
};

const PlayOffsBracket: React.FC<Props> = ({ bracket, teams }) => {
  return (
    <>
      {bracket.placeMatches.map((game: GameStructure) => (
        <BracketSectionContainerStyled key={game.round}>
          <GameSummaryRecursive game={game} teams={teams} />
        </BracketSectionContainerStyled>
      ))}
    </>
  );
};

export default PlayOffsBracket;
