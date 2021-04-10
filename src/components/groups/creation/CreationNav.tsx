import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { Button, Grid, IconButton, Hidden } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import AddIcon from "@material-ui/icons/Add";

import styled from "styled-components";
import { LOCALE } from "../../../locale/config";
import groupCreationDict from "../../../locale/creationNav.dict.";
import { mainTheme } from "../../../styled/styledConst";
import { useNotification } from "../../global/Notification";

const GridContainer = styled(Grid)`
  padding: 4px;
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
  cancel: () => void;
  save: () => void;
  openSettings: () => void;
  locale: LOCALE;
  add: () => void;
  draw: () => void;
}

const CreationNav: React.FC<CreationNavProps> = ({
  locale,
  cancel,
  save,
  openSettings,
  add,
  draw,
}) => {
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const handleSave = () => {
    setQuestion("doCreateGroups");
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
  // TODO: Implement Cancel button
  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <GridContainer container justify="space-around" alignItems="center">
        <Grid item>
          <ButtonCancel variant="outlined" size="small" onClick={cancel}>
            <Translator id="cancel" />
          </ButtonCancel>
        </Grid>
        <Grid item>
          <Grid container spacing={5}>
            <Hidden smDown>
              <Grid item>
                <IconButton size="small" color="secondary" onClick={draw}>
                  <AutorenewIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <IconButton size="small" color="secondary" onClick={openSettings}>
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Hidden smDown>
              <Grid item>
                <IconButton size="small" color="secondary" onClick={add}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
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
