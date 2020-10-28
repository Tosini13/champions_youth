import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import { GameStructure } from "../../../../structures/game";
import { DialogStyled } from "../../../../styled/styledLayout";
import MatchSummaryMock from "../../../matches/MatchSummaryMock";
import { GAME_SIDE } from "../../../../const/playOffsConst";
import { TeamData } from "../../../../models/teamData";
import { Group } from "../../../../models/groupData";
import ChoosePromoted from "./promoted/ChoosePromoted";
import ChooseTeam from "./teams/ChooseTeam";
import { BracketStructure } from "../../../../structures/bracket";
import { Placeholder, PromotedTeam } from "../../../../const/groupConst";

type Props = {
  teams?: TeamData[];
  groups?: Group[];
  handleClose: () => void;
  open: boolean;
  game: GameStructure;
  bracket: BracketStructure;
  chosenTeams: TeamData[];
  setChosenTeams: (teams: TeamData[]) => void;
  chosenPromoted: Placeholder[];
  setChosenPromoted: (teams: Placeholder[]) => void;
};

const Choose: React.FC<Props> = ({
  handleClose,
  open,
  game,
  groups,
  teams,
  bracket,
  chosenTeams,
  setChosenTeams,
  chosenPromoted,
  setChosenPromoted,
}) => {
  const [gameSide, setGameSide] = useState(GAME_SIDE.HOME);
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
      {groups && groups?.length > 0 ? (
        <ChoosePromoted
          chosenTeams={chosenPromoted}
          setChosenPromoted={setChosenPromoted}
          bracket={bracket}
          groups={groups}
          game={game}
          gameSide={gameSide}
        />
      ) : (
        <ChooseTeam
          chosenTeams={chosenTeams}
          setChosenTeams={setChosenTeams}
          bracket={bracket}
          teams={teams}
          game={game}
          gameSide={gameSide}
        />
      )}
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

export default Choose;
