import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import {
  ButtonHorizontalContainerStyled,
  IconButtonStyled,
} from "../../../styled/styledButtons";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  submitGroups: () => void;
  cancelCreation: () => void;
  addGroup: () => void;
  removeGroup: () => void;
  drawGroupsMatches: () => void;
};

const GroupsCreateMenu: React.FC<Props> = ({
  submitGroups,
  cancelCreation,
  addGroup,
  removeGroup,
  drawGroupsMatches,
}) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <div>
        <ButtonHorizontalContainerStyled>
          <ButtonRC onClick={cancelCreation}>
            <Translator id="cancel" />
          </ButtonRC>
          <ButtonRC onClick={submitGroups}>
            <Translator id="create" />
          </ButtonRC>
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
    </Rosetta>
  );
};

export default GroupsCreateMenu;
