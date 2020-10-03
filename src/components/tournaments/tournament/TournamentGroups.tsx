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

const TournamentGroups: React.FC<Props> = ({ tournament }) => {
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
        <div>Created groups</div>
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deletePlayOffs}
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
    return <div>Creation groups</div>;
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
