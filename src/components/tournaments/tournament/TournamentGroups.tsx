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

type Props = {
  tournament: TournamentData;
  groups?: Group[];
  teams: TeamData[];
  locale: LOCALE;
  tournamentId: Id;
  deleteGroups: (tournamentId: Id) => void;
};

const TournamentGroups: React.FC<Props> = ({
  tournament,
  teams,
  groups,
  locale,
  tournamentId,
  deleteGroups,
}) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const handleDeleteGroups = () => {
    deleteGroups(tournamentId);
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {groups?.length ? (
          <>
            <GroupsComponent groups={groups} />
            {/* <ButtonHorizontalContainerStyled>
              <ButtonErrorStyled
                onClick={handleDeleteGroups}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                <Translator id="deleteGroupStage" />
              </ButtonErrorStyled>
            </ButtonHorizontalContainerStyled> */}
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
        {!create && !groups?.length ? (
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
    deleteGroups: (tournamentId: Id) => dispatch(deleteGroups(tournamentId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentGroups);
