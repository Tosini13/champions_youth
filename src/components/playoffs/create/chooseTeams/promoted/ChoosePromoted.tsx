import React from "react";

import { BracketStructure } from "../../../../../structures/bracket";
import { GameStructure } from "../../../../../structures/game";
import { Group } from "../../../../../models/groupData";
import ChoosePromotedList from "./ChoosePromotedList";
import { Id } from "../../../../../const/structuresConst";
import { Placeholder } from "../../../../../NewModels/Team";
import { LOCALE } from "../../../../../locale/config";

const GAME_SIDE = {
  HOME: "HOME",
  AWAY: "AWAY",
};

type Props = {
  groups?: Group[];
  game: GameStructure;
  bracket: BracketStructure;
  gameSide: string;
  chosenTeams: Placeholder[];
  setChosenPromoted: (teams: Placeholder[]) => void;
  locale: LOCALE;
};

const ChoosePromoted: React.FC<Props> = ({
  locale,
  groups,
  game,
  bracket,
  gameSide,
  chosenTeams,
  setChosenPromoted,
}) => {
  const handleSetChosenTeams = (teams: Placeholder[]) => {
    setChosenPromoted(teams);
  };

  const handleChooseTeam = (groupId: Id, team?: Placeholder) => {
    if (team === undefined && gameSide === GAME_SIDE.HOME) {
      game.setHomePlaceholder = undefined;
    }
    if (team && gameSide === GAME_SIDE.HOME) {
      game.setHomePlaceholder = { ...team, id: groupId };
    }
    if (team === undefined && gameSide === GAME_SIDE.AWAY) {
      game.setAwayPlaceholder = undefined;
    }
    if (team && gameSide === GAME_SIDE.AWAY) {
      game.setAwayPlaceholder = { ...team, id: groupId };
    }
    bracket.updateGame(game);
  };

  const getAvailableTeam = () => {
    if (gameSide === GAME_SIDE.HOME)
      return game.placeholder?.home as Placeholder;
    if (gameSide === GAME_SIDE.AWAY)
      return game.placeholder?.away as Placeholder;
    return undefined;
  };

  return (
    <ChoosePromotedList
      locale={locale}
      groups={groups}
      handleChooseTeam={handleChooseTeam}
      chosenTeams={chosenTeams}
      gameTeam={getAvailableTeam()}
      setChosenTeams={handleSetChosenTeams}
    />
  );
};

export default ChoosePromoted;
