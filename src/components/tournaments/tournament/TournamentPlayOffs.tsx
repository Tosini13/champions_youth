import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import PlayOffsCreateDashboard from "../../playoffs/create/PlayOffsCreateDashboard";
import { TournamentData } from "../../../models/tournamentData";
import { TeamData } from "../../../models/teamData";
import { Game } from "../../../models/gameData";
import PlayOffsBracket from "../../playoffs/PlayOffsBracket";
import { Group } from "../../../models/groupData";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";

type Props = {
  tournament: TournamentData;
  playOffs?: Game[];
  teams: TeamData[];
  groups?: Group[];
  locale: LOCALE;
};

const TournamentPlayOffs: React.FC<Props> = ({
  playOffs,
  tournament,
  teams,
  groups,
  locale,
}) => {
  const [create, setCreate] = useState<boolean>(false);

  const createPlayOffs = () => {
    setCreate(!create);
  };

  const deletePlayOffs = () => {
    console.log("deletePlayOffs");
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {playOffs?.length ? (
          <>
            <PlayOffsBracket playOffs={playOffs} />
            <ButtonHorizontalContainerStyled>
              <ButtonErrorStyled
                onClick={deletePlayOffs}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                <Translator id="deletePlayOff" />
              </ButtonErrorStyled>
            </ButtonHorizontalContainerStyled>
          </>
        ) : null}
        {create ? (
          <PlayOffsCreateDashboard
            tournament={tournament}
            teams={teams}
            groups={groups}
            toggleCreate={createPlayOffs}
          />
        ) : null}
        {!playOffs?.length && !create ? (
          <ButtonHorizontalContainerStyled>
            <ButtonSuccessStyled
              onClick={createPlayOffs}
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
            >
              <Translator id="createPlayOff" />
            </ButtonSuccessStyled>
          </ButtonHorizontalContainerStyled>
        ) : null}
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(TournamentPlayOffs);
