import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import { TournamentStructure } from "../../../structures/tournament";
import { BracketData } from "../../../structures/bracket";

type Props = {
  bracket?: BracketData;
};

const TournamentPlayOffs: React.FC<Props> = ({ bracket }) => {
  const [create, setCreate] = useState<boolean>(false);

  const createPlayOffs = () => {
    console.log("createPlayOffs");
    setCreate(!create);
  };

  const deletePlayOffs = () => {
    console.log("deletePlayOffs");
    // tournament.deletePlayOffs();
  };

  if (bracket) {
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
