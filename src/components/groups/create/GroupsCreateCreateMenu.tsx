import React from "react";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
  IconButtonStyled,
} from "../../../styled/styledButtons";

type Props = {
  submitGroups: () => void;
  cancelCreation: () => void;
  addGroup: () => void;
  removeGroup: () => void;
  drawGroupsMatches: () => void;
};

const GroupsCreate: React.FC<Props> = ({
  submitGroups,
  cancelCreation,
  addGroup,
  removeGroup,
  drawGroupsMatches,
}) => {
  return (
    <div>
      <ButtonHorizontalContainerStyled>
        <ButtonErrorStyled
          variant="outlined"
          color="secondary"
          onClick={cancelCreation}
        >
          Anuluj
        </ButtonErrorStyled>
        <ButtonSuccessStyled
          variant="outlined"
          color="secondary"
          onClick={submitGroups}
        >
          Stwórz
        </ButtonSuccessStyled>
      </ButtonHorizontalContainerStyled>
      <ButtonHorizontalContainerStyled>
        <IconButtonStyled onClick={removeGroup}>
          <RemoveIcon />
        </IconButtonStyled>
        <IconButtonStyled onClick={drawGroupsMatches}>
          <AutorenewIcon />
        </IconButtonStyled>
        <IconButtonStyled onClick={addGroup}>
          <AddIcon />
        </IconButtonStyled>
      </ButtonHorizontalContainerStyled>
    </div>
  );
};

export default GroupsCreate;
