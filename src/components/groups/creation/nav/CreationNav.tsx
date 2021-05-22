import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Grid, Hidden } from "@material-ui/core";
import { Save, Cancel } from "@material-ui/icons";

import styled from "styled-components";
import groupCreationDict from "../../../../locale/creationNav.dict.";
import { mainTheme } from "../../../../styled/styledConst";
import { useNotification } from "../../../global/Notification";
import { useLocale } from "../../../../Provider/LocaleProvider";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";
import NavManage from "./NavManage";

const GridContainer = styled(Grid)`
  padding: 4px;
  width: 100%;
  background-color: ${mainTheme.palette.primary.main};
  background-color: transparent;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export interface CreationNavProps {
  cancel: () => void;
  save: () => void;
  openSettings: () => void;
  add: () => void;
  draw: () => void;
}

const CreationNav: React.FC<CreationNavProps> = ({
  cancel,
  save,
  openSettings,
  add,
  draw,
}) => {
  const { locale } = useLocale();
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
      <>
        <Hidden mdUp>
          <GridContainer container justify="space-around" alignItems="center">
            <Grid item>
              <ButtonRC size="small" onClick={cancel} startIcon={<Cancel />}>
                <Translator id="cancel" />
              </ButtonRC>
            </Grid>
            <Grid item>
              <NavManage openSettings={openSettings} add={add} draw={draw} />
            </Grid>
            <Grid item>
              <ButtonRC size="small" onClick={handleSave} startIcon={<Save />}>
                <Translator id="save" />
              </ButtonRC>
            </Grid>
          </GridContainer>
        </Hidden>
        <Hidden smDown>
          <GridContainer
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: "10px 20px" }}
          >
            <Grid item></Grid>
            <Grid item>
              <NavManage openSettings={openSettings} add={add} draw={draw} />
            </Grid>
            <Grid item>
              <Grid container spacing={4}>
                <Grid item>
                  <ButtonRC
                    size="small"
                    onClick={cancel}
                    startIcon={<Cancel />}
                  >
                    <Translator id="cancel" />
                  </ButtonRC>
                </Grid>
                <Grid item>
                  <ButtonRC
                    size="small"
                    onClick={handleSave}
                    startIcon={<Save />}
                  >
                    <Translator id="save" />
                  </ButtonRC>
                </Grid>
              </Grid>
            </Grid>
          </GridContainer>
        </Hidden>
      </>
    </Rosetta>
  );
};

export default CreationNav;
