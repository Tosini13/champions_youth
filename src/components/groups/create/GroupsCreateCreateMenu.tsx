import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
  IconButtonStyled,
} from "../../../styled/styledButtons";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";

type Props = {
  submitGroups: () => void;
  cancelCreation: () => void;
  addGroup: () => void;
  removeGroup: () => void;
  drawGroupsMatches: () => void;
  locale: LOCALE;
};

const GroupsCreateMenu: React.FC<Props> = ({
  submitGroups,
  cancelCreation,
  addGroup,
  removeGroup,
  drawGroupsMatches,
  locale,
}) => {
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <div>
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            variant="outlined"
            color="secondary"
            onClick={cancelCreation}
          >
            <Translator id="cancel" />
          </ButtonErrorStyled>
          <ButtonSuccessStyled
            variant="outlined"
            color="secondary"
            onClick={submitGroups}
          >
            <Translator id="create" />
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
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(GroupsCreateMenu);
