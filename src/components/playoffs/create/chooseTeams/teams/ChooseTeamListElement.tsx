import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  ChooseListItemSecondaryActionStyled,
  ChooseListItemStyled,
  ListItemTextStyled,
} from "../../../../../styled/styledBracket";
import { TeamData } from "../../../../../models/teamData";
import { LOCALE } from "../../../../../locale/config";

type Props = {
  locale: LOCALE;
  element: TeamData;
  selected: boolean;
  addToChosenTeams: (chosenTeam: TeamData) => void;
  disabled: boolean;
};

const PlayOffsChooseListElement: React.FC<Props> = ({
  locale,
  element,
  selected,
  disabled,
  addToChosenTeams,
}) => {
  return (
    <ChooseListItemStyled
      button
      onClick={() => addToChosenTeams(element)}
      disabled={disabled}
    >
      <ListItemTextStyled primary={element.name} />
      <ChooseListItemSecondaryActionStyled>
        <IconButton size="small">
          {selected || disabled ? (
            <RemoveIcon color="secondary" />
          ) : (
            <AddIcon color="secondary" />
          )}
        </IconButton>
      </ChooseListItemSecondaryActionStyled>
    </ChooseListItemStyled>
  );
};

export default PlayOffsChooseListElement;
