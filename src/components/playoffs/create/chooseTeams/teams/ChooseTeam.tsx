import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import { TeamData } from "../../../../../models/teamData";
import { BracketStructure } from "../../../../../structures/bracket";
import { GameStructure } from "../../../../../structures/game";
import { DialogStyled } from "../../../../../styled/styledLayout";
import PlayOffsChooseList from "./ChooseTeamList";
import MatchSummaryMock from "../../../../matches/MatchSummaryMock";
import {
  PromotedGroupsTeams,
  PromotedTeam,
} from "../../../../../const/groupConst";
import { Group } from "../../../../../models/groupData";

const GAME_SIDE = {
  HOME: "HOME",
  AWAY: "AWAY",
};

type Props = {
  teams?: TeamData[];
  game: GameStructure;
  bracket: BracketStructure;
  gameSide: string;
  chosenTeams: TeamData[];
  setChosenTeams: (teams: TeamData[]) => void;
};

const ChooseTeam: React.FC<Props> = ({
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
      teams={teams}
      handleChooseTeam={handleChooseTeam}
      chosenTeams={chosenTeams}
      gameTeam={getAvailableTeam()}
      setChosenTeams={handleSetChosenTeams}
    />
  );
};

export default ChooseTeam;
