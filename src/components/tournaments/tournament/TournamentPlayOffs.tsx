import React, { useState } from "react";

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

type Props = {
  tournament: TournamentData;
  playOffs?: Game[];
  teams: TeamData[];
};

const TournamentPlayOffs: React.FC<Props> = ({
  playOffs,
  tournament,
  teams,
}) => {
  const [create, setCreate] = useState<boolean>(false);

  const createPlayOffs = () => {
    console.log("createPlayOffs");
    setCreate(!create);
  };

  const deletePlayOffs = () => {
    console.log("deletePlayOffs");
  };

  if (playOffs && playOffs.length) {
    return (
      <>
        <PlayOffsBracket playOffs={playOffs} />
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deletePlayOffs}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Usuń fazę pucharową
          </ButtonErrorStyled>
        </ButtonHorizontalContainerStyled>
      </>
    );
  }
  if (create) {
    return (
      <PlayOffsCreateDashboard
        tournament={tournament}
        teams={teams}
        toggleCreate={createPlayOffs}
      />
    );
    // return (
    //   <PlayOffsCreateDashboard
    //     tournament={tournament}
    //     toggleCreate={toggleCreate}
    //   />
    // );
  }
  return (
    <ButtonHorizontalContainerStyled>
      <ButtonSuccessStyled
        onClick={createPlayOffs}
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
      >
        Stwórz fazę pucharową
      </ButtonSuccessStyled>
    </ButtonHorizontalContainerStyled>
  );
};

export default TournamentPlayOffs;
