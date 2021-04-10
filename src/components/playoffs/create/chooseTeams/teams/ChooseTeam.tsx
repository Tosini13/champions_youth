import React from "react";
import { LOCALE } from "../../../../../locale/config";

import { TeamData } from "../../../../../models/teamData";
import { BracketStructure } from "../../../../../structures/bracket";
import { GameStructure } from "../../../../../structures/game";
import PlayOffsChooseList from "./ChooseTeamList";

const GAME_SIDE = {
  HOME: "HOME",
  AWAY: "AWAY",
};

type Props = {
  locale: LOCALE;
  teams?: TeamData[];
  game: GameStructure;
  bracket: BracketStructure;
  gameSide: string;
  chosenTeams: TeamData[];
  setChosenTeams: (teams: TeamData[]) => void;
};

const ChooseTeam: React.FC<Props> = ({
  locale,
  teams,
  game,
  bracket,
  gameSide,
  chosenTeams,
  setChosenTeams,
}) => {
  const handleSetChosenTeams = (teams: TeamData[]) => {
    setChosenTeams(teams);
  };

  const handleChooseTeam = (team?: TeamData) => {
    if (team === undefined && gameSide === GAME_SIDE.HOME)
      game.setHomeTeam = undefined;
    if (team && gameSide === GAME_SIDE.HOME) game.setHomeTeam = team;
    if (team === undefined && gameSide === GAME_SIDE.AWAY)
      game.setAwayTeam = undefined;
    if (team && gameSide === GAME_SIDE.AWAY) game.setAwayTeam = team;
    bracket.updateGame(game);
  };

  const getAvailableTeam = () => {
    if (gameSide === GAME_SIDE.HOME) return game.homeTeam;
    if (gameSide === GAME_SIDE.AWAY) return game.awayTeam;
    return undefined;
  };

  return (
    <PlayOffsChooseList
      locale={locale}
      teams={teams}
      handleChooseTeam={handleChooseTeam}
      chosenTeams={chosenTeams}
      gameTeam={getAvailableTeam()}
      setChosenTeams={handleSetChosenTeams}
    />
  );
};

export default ChooseTeam;
