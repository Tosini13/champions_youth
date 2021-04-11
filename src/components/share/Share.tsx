import React, { useEffect, useState } from "react";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";

import {
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { WhatsApp, FileCopy } from "@material-ui/icons";

import { DialogRU } from "../../styled/styledDialog";
import { LOCALE } from "../../locale/config";
import shareDict from "../../locale/shareDict.dict";
import { AStyled } from "../../styled/styledLayout";
import { mainTheme } from "../../styled/styledConst";

const TypographyCopiedStyled = styled(Typography)`
  color: ${mainTheme.palette.primary.light};
  text-align: right;
`;

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
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);
  return (
    <DialogRU open={open} onClose={handleClose} title="share" locale={locale}>
      <Rosetta translations={shareDict} locale={locale}>
        <List>
          <ListItem button>
            <Grid
              container
              alignItems="center"
              onClick={() => {
                navigator.clipboard.writeText(message);
                setCopied(true);
              }}
            >
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
              {copied ? (
                <Grid item style={{ flexGrow: 1 }}>
                  <TypographyCopiedStyled>
                    <Translator id="copied" />!
                  </TypographyCopiedStyled>
                </Grid>
              ) : null}
            </Grid>
          </ListItem>
          <ListItem button>
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
          </ListItem>
        </List>
      </Rosetta>
    </DialogRU>
  );
};

export default Share;
