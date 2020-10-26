import React from "react";
import { GameStructure } from "../../../structures/game";
import { BracketSectionContainerStyled } from "../../../styled/styledBracket";
import GameSummaryRecursiveMock from "../../games/GameSummaryRecursiveMock";

type Props = {
  placeMatches: GameStructure[];
  handleOpenTeams: (game: GameStructure) => void;
};

const PlayOffsCreateBracketMock: React.FC<Props> = ({
  placeMatches,
  handleOpenTeams,
}) => {
  return (
    <>
      {placeMatches.map((game: GameStructure) => (
        <BracketSectionContainerStyled key={game.round}>
          <GameSummaryRecursiveMock
            game={game}
            handleOpenTeams={handleOpenTeams}
          />
        </BracketSectionContainerStyled>
      ))}
    </>
  );
};

export default PlayOffsCreateBracketMock;
