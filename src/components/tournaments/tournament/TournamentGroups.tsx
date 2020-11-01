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

type Props = {
  tournament: TournamentData;
  groups?: Group[];
  teams: TeamData[];
  locale: LOCALE;
};

const TournamentGroups: React.FC<Props> = ({
  tournament,
  teams,
  groups,
  locale,
}) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const deleteGroups = () => {
    console.log("To delete!");
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        {groups?.length ? (
          <>
            <GroupsComponent groups={groups} />
            <ButtonHorizontalContainerStyled>
              <ButtonErrorStyled
                onClick={deleteGroups}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                <Translator id='deleteGroupStage' />
              </ButtonErrorStyled>
            </ButtonHorizontalContainerStyled>
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
            <Translator id='createGroupStage' />
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

export default connect(mapStateToProps)(TournamentGroups);
