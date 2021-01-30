import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  ChooseListItemSecondaryActionStyled,
  ChooseListItemStyled,
  ListItemTextStyled,
} from "../../../../../styled/styledBracket";
import { Id } from "../../../../../const/structuresConst";
import { PromotedTeam } from "../../../../../NewModels/Team";

type Props = {
  element: PromotedTeam;
  selected: boolean;
  groupId?: Id | null;
  addToChosenTeams: (chosenTeam: PromotedTeam, groupId: Id) => void;
};

const ChoosePromotedListElement: React.FC<Props> = ({
  element,
  selected,
  groupId,
  addToChosenTeams,
}) => {
  return (
    <ChooseListItemStyled
      button
      onClick={() => {
        if (groupId) addToChosenTeams(element, groupId);
      }}
    >
      <ListItemTextStyled primary={element.name} />
      <ChooseListItemSecondaryActionStyled>
        <IconButton>
          {selected ? (
            <RemoveIcon color="secondary" />
          ) : (
            <AddIcon color="secondary" />
          )}
        </IconButton>
      </ChooseListItemSecondaryActionStyled>
    </ChooseListItemStyled>
  );
};

export default ChoosePromotedListElement;
