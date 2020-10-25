import React from "react";
import { TeamData } from "../../../models/teamData";
import { BracketStructure } from "../../../structures/bracket";
import { GameStructure } from "../../../structures/game";
import { BracketSectionContainerStyled } from "../../../styled/styledBracket";
import GameSummaryRecursiveMock from "../../games/GameSummaryRecursiveMock";

type Props = {
  bracket: BracketStructure;
  teams: TeamData[];
  handleOpenTeams: (game: GameStructure) => void;
};

const PlayOffsCreateBracketMock: React.FC<Props> = ({
  bracket,
  teams,
  handleOpenTeams,
}) => {
  return (
    <>
      {bracket.placeMatches.map((game: GameStructure) => (
        <BracketSectionContainerStyled key={game.round}>
          <GameSummaryRecursiveMock
            game={game}
            teams={teams}
            handleOpenTeams={handleOpenTeams}
          />
        </BracketSectionContainerStyled>
      ))}
    </>
  );
};

export default PlayOffsCreateBracketMock;
