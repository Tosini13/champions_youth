import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

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
import { Placeholder } from "../../../../const/groupConst";
import { LOCALE } from "../../../../locale/config";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";

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
  locale: LOCALE;
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
  locale,
}) => {
  const [gameSide, setGameSide] = useState(GAME_SIDE.HOME);
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <DialogStyled open={open} onClose={handleClose}>
        <MatchSummaryMock match={game.match} locale={locale} />
        <Grid container justify="space-around">
          <Button
            variant={gameSide === GAME_SIDE.HOME ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setGameSide(GAME_SIDE.HOME)}
          >
            <Translator id="host" />
          </Button>
          <Button
            variant={gameSide === GAME_SIDE.AWAY ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setGameSide(GAME_SIDE.AWAY)}
          >
            <Translator id="guest" />
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
          <Translator id="ok" />
        </Button>
      </DialogStyled>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(Choose);
