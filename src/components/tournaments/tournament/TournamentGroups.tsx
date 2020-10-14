import React, { useState } from "react";

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
import { Group } from "../../../structures/dbAPI/groupData";
import GroupsComponent from "../../groups/GroupsComponent";

type Props = {
  tournament: TournamentData;
  groups?: Group[];
  teams: TeamData[];
};

const TournamentGroups: React.FC<Props> = ({ tournament, teams, groups }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const deleteGroups = () => {
    console.log("To delete!");
  };

  if (groups?.length) {
    return (
      <>
        <GroupsComponent groups={groups} />
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deleteGroups}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Usuń fazę grupową
          </ButtonErrorStyled>
        </ButtonHorizontalContainerStyled>
      </>
    );
  }
  if (create) {
    return (
      <GroupsCreate
        toggleCreate={toggleCreate}
        tournament={tournament}
        groupStage={new GroupStage()}
        teams={teams}
      />
    );
  }
  return (
    <ButtonHorizontalContainerStyled>
      <ButtonSuccessStyled
        onClick={toggleCreate}
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
      >
        Stwórz fazę grupową
      </ButtonSuccessStyled>
    </ButtonHorizontalContainerStyled>
  );
};

export default TournamentGroups;
