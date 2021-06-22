import React, { useEffect, useState } from "react";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";

import { FacebookShareButton } from "react-share";

import {
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import { WhatsApp, Link, Facebook } from "@material-ui/icons";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";
import shareDict from "../../locale/shareDict.dict";
import { AStyled } from "../../styled/styledLayout";
import { useLocale } from "../../Provider/LocaleProvider";
import { useColors } from "../../styled/themes/CustomThemeProvider";

const TypographyCopiedStyled = styled(Typography)<{
  textColor: string
}>`
  color: ${(props) => props.textColor};
  text-align: right;
`;

export const TypographyCopied: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  const {specialColor} = useColors();
  return (
  <TypographyCopiedStyled color="textPrimary" {...props} textColor={specialColor}>
    {children}
  </TypographyCopiedStyled>
)};

export interface ShareProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

const Share: React.FC<ShareProps> = ({ message, open, handleClose }) => {
  const { locale } = useLocale();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);
  return (
    <DialogRU open={open} onClose={handleClose} title="share">
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
                  <Link color="secondary" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>
                  <Translator id="copyLink" />
                </Typography>
              </Grid>
              {copied ? (
                <Grid item style={{ flexGrow: 1 }}>
                  <TypographyCopied>
                    <Translator id="copied" />!
                  </TypographyCopied>
                </Grid>
              ) : null}
            </Grid>
          </ListItem>
          <ListItem button>
            <FacebookShareButton
              url={message}
              quote={"Champions Youth"}
              hashtag={"#ChampionsYouth"}
            >
            <Grid
              container
              alignItems="center"
            >
              <Grid item>
                <IconButton>
                  <Facebook color="secondary" />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>
                  <Translator id="facebook" />
                </Typography>
              </Grid>
            </Grid>
            </FacebookShareButton>
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
