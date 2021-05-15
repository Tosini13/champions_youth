import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";

import {
  Dialog,
  DialogProps,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import dialogDict from "../../../locale/dialog.dict";
import { LOCALE } from "../../../locale/config";
import { SectionContentStyled, SectionStyled } from "../../styledLayout";

export const DialogHeaderStyled = styled(Grid)`
  padding: 5px;
`;

export const DialogStyled = styled(Dialog)`
  .MuiPaper-root {
    padding: 3px;
    background-color: ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.text.primary};
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
}) => {
  const theme = useTheme();
  return (
    <Rosetta translations={dialogDict} locale={locale}>
      <DialogStyled onClose={onClose} theme={theme} {...props}>
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
              wrap="nowrap"
            >
              <Grid item>
                <Typography variant="h6">
                  <Translator id={title} /> {matchNumber}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="close-dialog"
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
};
