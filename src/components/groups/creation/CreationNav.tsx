import { Button, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";
import { LOCALE } from "../../../locale/config";
import groupCreationDict from "../../../locale/creationNav.dict.";
import { mainTheme } from "../../../styled/styledConst";
import { useNotification } from "../../global/Notification";

const GridContainer = styled(Grid)`
  padding: 4px;
  position: fixed;
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: ${mainTheme.palette.primary.main};
  display: flex;
  justify-content: space-around;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const ButtonCancel = styled(Button)`
  color: ${mainTheme.palette.error.main};
  border-color: ${mainTheme.palette.error.main};
`;
const ButtonSave = styled(Button)`
  color: ${mainTheme.palette.success.main};
  border-color: ${mainTheme.palette.success.main};
`;

export interface CreationNavProps {
  save: () => void;
  locale: LOCALE;
}

const CreationNav: React.FC<CreationNavProps> = ({ locale, save }) => {
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const handleSave = () => {
    setQuestion("doCreateGroup");
    setAnswers([
      {
        title: "yes",
        action: save,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };
  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <GridContainer container justify="space-around">
        <Grid item>
          <ButtonCancel variant="outlined" size="small">
            <Translator id="cancel" />
          </ButtonCancel>
        </Grid>
        <Grid item>
          <ButtonSave variant="outlined" size="small" onClick={handleSave}>
            <Translator id="save" />
          </ButtonSave>
        </Grid>
      </GridContainer>
    </Rosetta>
  );
};

const mapStateToProps = (state: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(CreationNav);
