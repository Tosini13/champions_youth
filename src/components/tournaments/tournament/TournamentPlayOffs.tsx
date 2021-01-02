import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";
import { useHistory } from "react-router-dom";

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
import { deletePlayOffs } from "../../../store/actions/PlayOffsActions";
import { Id } from "../../../const/structuresConst";
import { setInProgress } from "../../global/InProgress";
import InfoStatic from "../../global/InfoStatic";
import { useNotification } from "../../global/Notification";
import ChooseStructure from "../../playoffs/creation/ChooseStructure";
import { routerGenerateConst } from "../../../const/menuConst";

type Props = {
  tournamentId: Id;
  tournament: TournamentData;
  playOffs?: Game[];
  teams: TeamData[];
  groups?: Group[];
  locale: LOCALE;
  isOwner: boolean;
  deletePlayOffs: (
    tournamentId: Id,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
};

const TournamentPlayOffs: React.FC<Props> = ({
  tournamentId,
  playOffs,
  tournament,
  teams,
  groups,
  locale,
  isOwner,
  deletePlayOffs,
}) => {
  const history = useHistory();
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const [create, setCreate] = useState<boolean>(false);
  const [openChosenStructure, setOpenChosenStructure] = useState<boolean>(
    false
  );

  const createPlayOffs = () => {
    setCreate(!create);
  };

  const handleExecuteDelete = () => {
    setInProgress(true);
    deletePlayOffs(
      tournamentId,
      () => {
        setInProgress(false);
      },
      () => {
        setInProgress(false);
      }
    );
  };

  const handleDelete = () => {
    setQuestion("doDeletePlayOffs");
    setAnswers([
      {
        title: "yes",
        action: handleExecuteDelete,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {playOffs?.length ? (
          <>
            <PlayOffsBracket playOffs={playOffs} />
            {isOwner ? (
              <ButtonHorizontalContainerStyled>
                <ButtonErrorStyled
                  onClick={handleDelete}
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  <Translator id="deletePlayOff" />
                </ButtonErrorStyled>
              </ButtonHorizontalContainerStyled>
            ) : null}
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
        {!playOffs?.length && !isOwner && !create ? (
          <InfoStatic>
            <Translator id="noPlayOffs" />
          </InfoStatic>
        ) : null}
        {!playOffs?.length && isOwner && !create && !teams.length ? (
          <InfoStatic>
            <Translator id="noTeams" />
          </InfoStatic>
        ) : null}
        {!playOffs?.length && isOwner && !create && teams.length ? (
          <ButtonHorizontalContainerStyled>
            <ButtonSuccessStyled
              onClick={() => groups?.length ? setOpenChosenStructure(true) : createPlayOffs()}
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
            >
              <Translator id="createPlayOff" />
            </ButtonSuccessStyled>
          </ButtonHorizontalContainerStyled>
        ) : null}
        <ChooseStructure
          opened={openChosenStructure}
          handleClose={() => setOpenChosenStructure(false)}
          chooseGroup={() =>
            history.push(routerGenerateConst.createPlayOffsGroups(tournamentId))
          }
          chooseBracket={() => createPlayOffs()}
        />
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deletePlayOffs: (
      tournamentId: Id,
      callBackSuccess?: () => void,
      callBackError?: () => void
    ) => dispatch(deletePlayOffs(tournamentId, callBackSuccess, callBackError)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentPlayOffs);
