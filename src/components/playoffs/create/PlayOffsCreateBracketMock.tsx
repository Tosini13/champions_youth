import React from "react";
import { TeamData } from "../../../models/teamData";
import { GameStructure } from "../../../structures/game";
import { BracketSectionContainerStyled } from "../../../styled/styledBracket";
import GameSummaryRecursiveMock from "../../games/GameSummaryRecursiveMock";

type Props = {
  placeMatches: GameStructure[];
  teams: TeamData[];
  handleOpenTeams: (game: GameStructure) => void;
};

const PlayOffsCreateBracketMock: React.FC<Props> = ({
  placeMatches,
  teams,
  handleOpenTeams,
}) => {
  return (
    <>
      {placeMatches.map((game: GameStructure) => (
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
