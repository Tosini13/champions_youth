import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { Grid } from "@material-ui/core";

import { GameStructure } from "../../../../structures/game";
import MatchSummaryMock from "../../../matches/MatchSummaryMock";
import { GAME_SIDE } from "../../../../const/playOffsConst";
import { TeamData } from "../../../../models/teamData";
import { Group } from "../../../../models/groupData";
import ChoosePromoted from "./promoted/ChoosePromoted";
import ChooseTeam from "./teams/ChooseTeam";
import { BracketStructure } from "../../../../structures/bracket";
import { LOCALE } from "../../../../locale/config";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import { Placeholder } from "../../../../NewModels/Team";
import { DialogRU } from "../../../../styled/styledDialog";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";

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
    <DialogRU
      open={open}
      onClose={handleClose}
      locale={locale}
      title="chooseTeams"
    >
      <Rosetta translations={tournamentDetailsDict} locale={locale}>
        <>
          <MatchSummaryMock match={game.match} locale={locale} />
          <Grid container justify="space-around">
            <ButtonRC
              variant={gameSide === GAME_SIDE.HOME ? "contained" : "outlined"}
              onClick={() => setGameSide(GAME_SIDE.HOME)}
            >
              <Translator id="host" />
            </ButtonRC>
            <ButtonRC
              variant={gameSide === GAME_SIDE.AWAY ? "contained" : "outlined"}
              onClick={() => setGameSide(GAME_SIDE.AWAY)}
            >
              <Translator id="guest" />
            </ButtonRC>
          </Grid>
          {groups && groups?.length > 0 ? (
            <ChoosePromoted
              chosenTeams={chosenPromoted}
              setChosenPromoted={setChosenPromoted}
              bracket={bracket}
              groups={groups}
              game={game}
              gameSide={gameSide}
              locale={locale}
            />
          ) : (
            <ChooseTeam
              chosenTeams={chosenTeams}
              setChosenTeams={setChosenTeams}
              bracket={bracket}
              teams={teams}
              game={game}
              gameSide={gameSide}
              locale={locale}
            />
          )}
          <ButtonRC
            onClick={handleClose}
            style={{
              margin: "0px 5px 5px 5px",
            }}
          >
            <Translator id="ok" />
          </ButtonRC>
        </>
      </Rosetta>
    </DialogRU>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(Choose);
