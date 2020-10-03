import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import { TournamentStructure } from "../../../structures/tournament";

type Props = {
  tournament: TournamentStructure;
};

const TournamentPlayOffs: React.FC<Props> = ({ tournament }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const deletePlayOffs = () => {
    tournament.deletePlayOffs();
  };

  if (tournament.bracket) {
    return (
      <>
        {/* <PlayOffsBracket
          bracket={tournament.bracket}
          teams={tournament.teams}
        /> */}
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
    return null;
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
        onClick={toggleCreate}
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
