import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";

import { mainTheme } from "./styledConst";

import {
  Dialog,
  DialogProps,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import dialogDict from "../locale/dialog.dict";
import { LOCALE } from "../locale/config";
import { SectionContentStyled, SectionStyled } from "./styledLayout";

export const DialogHeaderStyled = styled(Grid)`
  padding: 5px;
`;

export const DialogStyled = styled(Dialog)`
  .MuiPaper-root {
    padding: 3px;
    color: ${mainTheme.palette.secondary.dark};
    background-color: ${mainTheme.palette.primary.dark};
    width: 90%;
    min-width: 290px;
    position: relative;
    overflow-y: initial;
  }
`;

type TDialogRUProps = DialogProps & {
  locale?: LOCALE; // Translate Element,
  title?: string;
  matchNumber?: string;
};

// TODO: When 3rd place change match number with title!
export const DialogRU: React.FC<TDialogRUProps> = ({
  children,
  title,
  matchNumber,
  locale,
  onClose,
  ...props
}) => (
  <Rosetta translations={dialogDict} locale={locale}>
    <DialogStyled onClose={onClose} {...props}>
      <SectionStyled
        style={{
          maxHeight: "88vh",
        }}
      >
        <Grid item>
          <DialogHeaderStyled
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h6">
                <Translator id={title} /> {matchNumber}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="secondary"
                onClick={() => (onClose ? onClose({}, "backdropClick") : {})}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogHeaderStyled>
        </Grid>
        <SectionContentStyled>{children}</SectionContentStyled>
      </SectionStyled>
    </DialogStyled>
  </Rosetta>
);
