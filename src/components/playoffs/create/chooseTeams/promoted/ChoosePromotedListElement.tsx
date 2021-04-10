import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  ChooseListItemSecondaryActionStyled,
  ChooseListItemStyled,
} from "../../../../../styled/styledBracket";
import { Id } from "../../../../../const/structuresConst";
import { PromotedTeam } from "../../../../../NewModels/Team";
import { LOCALE } from "../../../../../locale/config";
import chooseTeamDict from "../../../../../locale/chooseTeam.dict";
import { Typography } from "@material-ui/core";

type Props = {
  locale: LOCALE;
  element: PromotedTeam;
  selected: boolean;
  groupId?: Id | null;
  addToChosenTeams: (chosenTeam: PromotedTeam, groupId: Id) => void;
  disabled: boolean;
};

const ChoosePromotedListElement: React.FC<Props> = ({
  locale,
  element,
  selected,
  disabled,
  groupId,
  addToChosenTeams,
}) => {
  // PLACE TEXT TRANSLATE
  return (
    <Rosetta translations={chooseTeamDict} locale={locale}>
      <ChooseListItemStyled
        button
        onClick={() => {
          if (groupId) addToChosenTeams(element, groupId);
        }}
        disabled={disabled}
      >
        <Typography variant="body2" style={{ padding: "4px" }}>
          {element.name + " " + element.place + " "} <Translator id="place" />
        </Typography>
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
    </Rosetta>
  );
};

export default ChoosePromotedListElement;
