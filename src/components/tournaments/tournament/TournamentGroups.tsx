import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { ButtonHorizontalContainerStyled } from "../../../styled/styledButtons";
import GroupsCreate from "../../groups/create/GroupsCreate";
import { TournamentData } from "../../../models/tournamentData";
import { GroupStage } from "../../../structures/groupStage";
import { TeamData } from "../../../models/teamData";
import GroupsComponent from "../../groups/GroupsComponent";
import { Group } from "../../../models/groupData";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { Id } from "../../../const/structuresConst";
import { deleteGroups } from "../../../store/actions/GroupActions";
import { setInProgress } from "../../global/InProgress";
import InfoStatic from "../../global/InfoStatic";
import { useNotification } from "../../global/Notification";
import { useHistory } from "react-router-dom";
import { routerGenerateConst } from "../../../const/menuConst";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  tournament: TournamentData;
  groups?: Group[];
  teams: TeamData[];
  playOffs: boolean;
  playOffsGroups: boolean;
  tournamentId: Id;
  deleteGroups: (
    tournamentId: Id,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
  isOwner: boolean;
};

const TournamentGroups: React.FC<Props> = ({
  tournament,
  teams,
  playOffs,
  playOffsGroups,
  groups,
  tournamentId,
  deleteGroups,
  isOwner,
}) => {
  const { locale } = useLocale();
  const history = useHistory();
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    if (playOffs) {
      console.log("playOffs are created!");
      return false;
    }
    setCreate(!create);
  };

  const handleExecuteDelete = () => {
    setInProgress(true);
    deleteGroups(
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
    if (playOffs || playOffsGroups) {
      setQuestion("deletePlayOffsToDeleteGroups");
      setAnswers([
        {
          title: "ok",
        },
      ]);
    } else {
      setQuestion("doDeleteGroups");
      setAnswers([
        {
          title: "yes",
          action: handleExecuteDelete,
        },
        {
          title: "no",
        },
      ]);
    }
    openNotification();
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {groups?.length ? (
          <>
            <GroupsComponent groups={groups} />
            {isOwner ? (
              <ButtonHorizontalContainerStyled>
                <ButtonRC
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                  disabled={playOffs || playOffsGroups}
                >
                  <Translator id="deleteGroupStage" />
                </ButtonRC>
              </ButtonHorizontalContainerStyled>
            ) : null}
          </>
        ) : null}
        {create ? (
          <GroupsCreate
            toggleCreate={toggleCreate}
            tournament={tournament}
            groupStage={new GroupStage()}
            teams={teams}
          />
        ) : null}
        {!create && !groups?.length && !isOwner ? (
          <InfoStatic>
            <Translator id="noGroup" />
          </InfoStatic>
        ) : null}
        {!create && !groups?.length && isOwner && !teams.length ? (
          <InfoStatic>
            <Translator id="noTeams" />
          </InfoStatic>
        ) : null}
        {!create && !groups?.length && isOwner && teams.length ? (
          <ButtonHorizontalContainerStyled>
            <ButtonRC
              onClick={() => {
                history.push(routerGenerateConst.createGroups(tournamentId));
              }}
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
              disabled={playOffs}
              aria-label="create groups"
            >
              <Translator id="createGroupStage" />
            </ButtonRC>
          </ButtonHorizontalContainerStyled>
        ) : null}
      </>
    </Rosetta>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteGroups: (
      tournamentId: Id,
      callBackSuccess?: () => void,
      callBackError?: () => void
    ) => dispatch(deleteGroups(tournamentId, callBackSuccess, callBackError)),
  };
};
export default connect(null, mapDispatchToProps)(TournamentGroups);
