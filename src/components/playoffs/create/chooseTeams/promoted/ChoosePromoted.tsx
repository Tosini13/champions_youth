import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import { TeamData } from "../../../../../models/teamData";
import { BracketStructure } from "../../../../../structures/bracket";
import { GameStructure } from "../../../../../structures/game";
import { DialogStyled } from "../../../../../styled/styledLayout";
import MatchSummaryMock from "../../../../matches/MatchSummaryMock";
import {
  Placeholder,
  PromotedGroupsTeams,
  PromotedTeam,
} from "../../../../../const/groupConst";
import { Group } from "../../../../../models/groupData";
import ChoosePromotedList from "./ChoosePromotedList";
import { Id } from "../../../../../const/structuresConst";

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
};

const ChoosePromoted: React.FC<Props> = ({
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
    if (team === undefined && gameSide === GAME_SIDE.HOME)
      game.setHomeTeam = undefined;
    if (team && gameSide === GAME_SIDE.HOME && game.placeholder)
      game.setHomePlaceholder = { ...team, id: groupId };
    if (team === undefined && gameSide === GAME_SIDE.AWAY)
      game.setAwayTeam = undefined;
    if (team && gameSide === GAME_SIDE.AWAY && game.placeholder)
      game.setAwayPlaceholder = { ...team, id: groupId };
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
      groups={groups}
      handleChooseTeam={handleChooseTeam}
      chosenTeams={chosenTeams}
      gameTeam={getAvailableTeam()}
      setChosenTeams={handleSetChosenTeams}
    />
  );
};

export default ChoosePromoted;
