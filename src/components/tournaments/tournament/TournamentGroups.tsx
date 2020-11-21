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
import GroupsCreate from "../../groups/create/GroupsCreate";
import { TournamentData } from "../../../models/tournamentData";
import { GroupStage } from "../../../structures/groupStage";
import { TeamData } from "../../../models/teamData";
import GroupsComponent from "../../groups/GroupsComponent";
import { Group } from "../../../models/groupData";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";
import { Id } from "../../../const/structuresConst";
import { deleteGroups } from "../../../store/actions/GroupActions";
import { Typography } from "@material-ui/core";
import { setInProgress } from "../../global/InProgress";

type Props = {
  tournament: TournamentData;
  groups?: Group[];
  teams: TeamData[];
  locale: LOCALE;
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
  groups,
  locale,
  tournamentId,
  deleteGroups,
  isOwner,
}) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const handleDelete = () => {
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

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {groups?.length ? (
          <>
            <GroupsComponent groups={groups} />
            {isOwner ? (
              <ButtonHorizontalContainerStyled>
                <ButtonErrorStyled
                  onClick={handleDelete}
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  <Translator id="deleteGroupStage" />
                </ButtonErrorStyled>
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
          <Typography>
            <Translator id="noGroup" />
          </Typography>
        ) : null}
        {!create && !groups?.length && isOwner ? (
          <ButtonHorizontalContainerStyled>
            <ButtonSuccessStyled
              onClick={toggleCreate}
              variant="outlined"
              color="secondary"
              startIcon={<AddIcon />}
            >
              <Translator id="createGroupStage" />
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteGroups: (
      tournamentId: Id,
      callBackSuccess?: () => void,
      callBackError?: () => void
    ) => dispatch(deleteGroups(tournamentId, callBackSuccess, callBackError)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentGroups);
