import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  ChooseListItemSecondaryActionStyled,
  ChooseListItemStyled,
  ListItemTextStyled,
} from "../../../styled/styledBracket";
import { TeamData } from "../../../models/teamData";
import { PromotedTeam } from "../../../const/groupConst";

type Props = {
  element: TeamData | PromotedTeam;
  selected: boolean;
  addToChosenTeams: (chosenTeam: TeamData | PromotedTeam) => void;
};

const PlayOffsChooseListElement: React.FC<Props> = ({
  element,
  selected,
  addToChosenTeams,
}) => {
  return (
    <ChooseListItemStyled button onClick={() => addToChosenTeams(element)}>
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

export default PlayOffsChooseListElement;
