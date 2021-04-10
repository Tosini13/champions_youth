import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Grid, IconButton, List, Typography } from "@material-ui/core";
import { WhatsApp, FileCopy } from "@material-ui/icons";

import { DialogRU } from "../../styled/styledDialog";
import { LOCALE } from "../../locale/config";
import shareDict from "../../locale/shareDict.dict";
import { AStyled } from "../../styled/styledLayout";

export interface ShareProps {
  locale: LOCALE;
  message: string;
  open: boolean;
  handleClose: () => void;
}

const Share: React.FC<ShareProps> = ({
  locale,
  message,
  open,
  handleClose,
}) => {
  return (
    <Rosetta translations={shareDict} locale={locale}>
      <DialogRU open={open} onClose={handleClose} title="share">
        <List>
          <AStyled
            href={`whatsapp://send?text=${message}`}
            data-action="share/whatsapp/share"
          >
            <Grid container alignItems="center">
              <Grid item>
                <IconButton>
                  <FileCopy color="secondary" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>
                  <Translator id="copyLink" />
                </Typography>
              </Grid>
            </Grid>
          </AStyled>
          <AStyled
            href={`whatsapp://send?text=${message}`}
            data-action="share/whatsapp/share"
          >
            <Grid container alignItems="center">
              <Grid item>
                <IconButton>
                  <WhatsApp color="secondary" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>WhatsApp</Typography>
              </Grid>
            </Grid>
          </AStyled>
        </List>
      </DialogRU>
    </Rosetta>
  );
};

export default Share;
