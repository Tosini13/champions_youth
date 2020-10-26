import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import { TeamData } from "../../../models/teamData";
import { BracketStructure } from "../../../structures/bracket";
import { GameStructure } from "../../../structures/game";
import { DialogStyled } from "../../../styled/styledLayout";
import PlayOffsChooseList from "./PlayOffsChooseList";
import MatchSummaryMock from "../../matches/MatchSummaryMock";
import { PromotedGroupsTeams, PromotedTeam } from "../../../const/groupConst";
import { Group } from "../../../models/groupData";

const GAME_SIDE = {
  HOME: "HOME",
  AWAY: "AWAY",
};

type Props = {
  teams?: TeamData[];
  groups?: Group[];
  chosenTeams: TeamData[]; // | PromotedTeam[]
  handleClose: () => void;
  handleSetChosenTeams: (teams: TeamData[]) => void; // | PromotedTeam[]
  open: boolean;
  game: GameStructure;
  handleUpdateBracket: (bracket: BracketStructure) => void;
  bracket: BracketStructure;
};

const ChooseTeam: React.FC<Props> = ({
  handleClose,
  open,
  teams,
  groups,
  chosenTeams,
  handleSetChosenTeams,
  game,
  handleUpdateBracket,
  bracket,
}) => {
  const [gameSide, setGameSide] = useState(GAME_SIDE.HOME);

  const handleChooseTeam = (team?: TeamData) => {
    if (team === undefined && gameSide === GAME_SIDE.HOME)
      game.setHomeTeam = undefined;
    if (team && gameSide === GAME_SIDE.HOME) game.setHomeTeam = team;
    if (team === undefined && gameSide === GAME_SIDE.AWAY)
      game.setAwayTeam = undefined;
    if (team && gameSide === GAME_SIDE.AWAY) game.setAwayTeam = team;
    bracket.updateGame(game);
    handleUpdateBracket(bracket);
  };

  const getAvailableTeam = () => {
    if (gameSide === GAME_SIDE.HOME) return game.homeTeam;
    if (gameSide === GAME_SIDE.AWAY) return game.awayTeam;
    return undefined;
  };

  return (
    <DialogStyled open={open} onClose={handleClose}>
      <MatchSummaryMock match={game.match} />
      <Grid container justify="space-around">
        <Button
          variant={gameSide === GAME_SIDE.HOME ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setGameSide(GAME_SIDE.HOME)}
        >
          Gospodarz
        </Button>
        <Button
          variant={gameSide === GAME_SIDE.AWAY ? "contained" : "outlined"}
          color="secondary"
          onClick={() => setGameSide(GAME_SIDE.AWAY)}
        >
          Gość
        </Button>
      </Grid>
      <PlayOffsChooseList
        teams={teams}
        groups={groups}
        handleChooseTeam={handleChooseTeam}
        chosenTeams={chosenTeams}
        gameTeam={getAvailableTeam()}
        setChosenTeams={handleSetChosenTeams}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClose}
        style={{
          margin: "0px 5px 5px 5px",
        }}
      >
        Ok
      </Button>
    </DialogStyled>
  );
};

export default ChooseTeam;
