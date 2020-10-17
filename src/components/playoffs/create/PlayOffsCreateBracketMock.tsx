import React from "react";
import { TeamData } from "../../../models/teamData";
import { BracketStructure } from "../../../structures/bracket";
import { GameStructure } from "../../../structures/game";
import { BracketSectionContainerStyled } from "../../../styled/styledBracket";
import GameSummaryRecursiveMock from "../../games/GameSummaryRecursiveMock";

type Props = {
  bracket: BracketStructure;
  teams: TeamData[];
};

const PlayOffsCreateBracketMock: React.FC<Props> = ({ bracket, teams }) => {
  return (
    <>
      {bracket.placeMatches.map((game: GameStructure) => (
        <BracketSectionContainerStyled key={game.round}>
          <GameSummaryRecursiveMock game={game} teams={teams} />
        </BracketSectionContainerStyled>
      ))}
    </>
  );
};

export default PlayOffsCreateBracketMock;
