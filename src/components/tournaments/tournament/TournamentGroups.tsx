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

type Props = {
  tournament: TournamentData;
  teams: TeamData[];
};

const TournamentGroups: React.FC<Props> = ({ tournament, teams }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const deleteGroups = () => {
    console.log("To delete!");
  };

  if (false) {
    return (
      <>
        <div>Created groups</div>
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
