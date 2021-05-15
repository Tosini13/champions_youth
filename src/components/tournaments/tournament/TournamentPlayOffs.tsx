import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";
import { useHistory } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { ButtonHorizontalContainerStyled } from "../../../styled/styledButtons";
import PlayOffsCreateDashboard from "../../playoffs/create/PlayOffsCreateDashboard";
import { TournamentData } from "../../../models/tournamentData";
import { TeamData } from "../../../models/teamData";
import { Game } from "../../../models/gameData";
import PlayOffsBracket from "../../playoffs/PlayOffsBracket";
import { Group } from "../../../models/groupData";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";
import {
  deletePlayOffs,
  deletePlayOffsGroups,
} from "../../../store/actions/PlayOffsActions";
import { Id } from "../../../const/structuresConst";
import { setInProgress } from "../../global/InProgress";
import InfoStatic from "../../global/InfoStatic";
import { useNotification } from "../../global/Notification";
import ChooseStructure from "../../playoffs/creation/ChooseStructure";
import { routerGenerateConst } from "../../../const/menuConst";
import { GroupModel } from "../../../NewModels/Group";
import PlayOffsGroups from "../../playoffs/groups/PlayOffsGroups";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

type Props = {
  tournamentId: Id;
  tournament: TournamentData;
  playOffs?: Game[];
  teams: TeamData[];
  groups?: Group[];
  playOffsGroups?: GroupModel[];
  locale: LOCALE;
  isOwner: boolean;
  deletePlayOffs: (
    tournamentId: Id,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
  deletePlayOffsGroups: (
    tournamentId: Id,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
};

const TournamentPlayOffs: React.FC<Props> = ({
  tournamentId,
  playOffs,
  playOffsGroups,
  tournament,
  teams,
  groups,
  locale,
  isOwner,
  deletePlayOffs,
  deletePlayOffsGroups,
}) => {
  const history = useHistory();
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const [create, setCreate] = useState<boolean>(false);
  const [openChosenStructure, setOpenChosenStructure] =
    useState<boolean>(false);

  const createPlayOffs = () => {
    setCreate(!create);
  };

  const handleExecuteDelete = () => {
    setInProgress(true);
    if (playOffs?.length) {
      deletePlayOffs(
        tournamentId,
        () => {
          setInProgress(false);
        },
        () => {
          setInProgress(false);
        }
      );
    }
    if (playOffsGroups?.length) {
      deletePlayOffsGroups(
        tournamentId,
        () => {
          setInProgress(false);
        },
        () => {
          setInProgress(false);
        }
      );
    }
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
        {playOffs?.length && !playOffsGroups?.length ? (
          <>
            <PlayOffsBracket
              playOffs={playOffs}
              locale={locale}
              tournamentId={tournamentId}
            />
            {isOwner ? (
              <ButtonHorizontalContainerStyled>
                <ButtonRC onClick={handleDelete} startIcon={<DeleteIcon />}>
                  <Translator id="deletePlayOff" />
                </ButtonRC>
              </ButtonHorizontalContainerStyled>
            ) : null}
          </>
        ) : null}
        {playOffsGroups?.length && !playOffs?.length ? (
          <>
            <PlayOffsGroups
              playOffsGroups={playOffsGroups}
              groups={groups}
              teams={teams}
            />
            {isOwner ? (
              <ButtonHorizontalContainerStyled>
                <ButtonRC onClick={handleDelete} startIcon={<DeleteIcon />}>
                  <Translator id="deletePlayOff" />
                </ButtonRC>
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
        {!playOffsGroups?.length && !playOffs?.length && !isOwner && !create ? (
          <InfoStatic>
            <Translator id="noPlayOffs" />
          </InfoStatic>
        ) : null}
        {!playOffsGroups?.length &&
        !playOffs?.length &&
        isOwner &&
        !create &&
        !teams.length ? (
          <InfoStatic>
            <Translator id="noTeams" />
          </InfoStatic>
        ) : null}
        {!playOffsGroups?.length &&
        !playOffs?.length &&
        isOwner &&
        !create &&
        teams.length ? (
          <ButtonHorizontalContainerStyled>
            <ButtonRC
              onClick={() =>
                groups?.length ? setOpenChosenStructure(true) : createPlayOffs()
              }
              startIcon={<AddIcon />}
            >
              <Translator id="createPlayOff" />
            </ButtonRC>
          </ButtonHorizontalContainerStyled>
        ) : null}
        <ChooseStructure
          locale={locale}
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
    deletePlayOffsGroups: (
      tournamentId: Id,
      callBackSuccess?: () => void,
      callBackError?: () => void
    ) =>
      dispatch(
        deletePlayOffsGroups(tournamentId, callBackSuccess, callBackError)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentPlayOffs);
