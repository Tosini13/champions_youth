import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Share as ShareIcon,
  Drafts,
  Inbox,
  AccountCircle,
} from "@material-ui/icons";

import { ListStyled, MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import Language from "../Language";
import menuDict from "../../../locale/menu";
import { GridContainer, ListItemStyled } from "./SignedInMenu";
import { Grid } from "@material-ui/core";
import Theme from "../Theme";
import { useLocale } from "../../../Provider/LocaleProvider";
import Share from "../../share/Share";

type Props = {
  handleCloseSideBar: () => void;
};

const SignedOutMenu: React.FC<Props> = ({ handleCloseSideBar }) => {
  const { locale } = useLocale();
  const [openShare, setOpenShare] = useState<boolean>(false);
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        <GridContainer container direction="column" justify="space-between">
          <Grid item>
            <ListStyled>
              <ListItemStyled borderposition="bottom" button>
                <ListItemIcon>
                  <AccountCircle color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="youAreLoggedOut" />} />
                <Language />
                <Theme />
              </ListItemStyled>
            </ListStyled>
          </Grid>
          <Grid item>
            <ListStyled>
              <ListItemStyled
                borderposition="top"
                button
                onClick={() => setOpenShare(true)}
              >
                <ListItemIcon>
                  <ShareIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="share" />} />
              </ListItemStyled>

              <ListItemStyled borderposition="top" button>
                <MenuLinkStyled
                  to={routerConstString.login}
                  onClick={handleCloseSideBar}
                >
                  <ListItemIcon>
                    <Inbox color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={<Translator id="signIn" />} />
                </MenuLinkStyled>
              </ListItemStyled>
              <ListItemStyled borderposition="top" button>
                <MenuLinkStyled
                  to={routerConstString.signUp}
                  onClick={handleCloseSideBar}
                >
                  <ListItemIcon>
                    <Drafts color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={<Translator id="signUp" />} />
                </MenuLinkStyled>
              </ListItemStyled>
            </ListStyled>
          </Grid>
        </GridContainer>
        <Share
          open={openShare}
          handleClose={() => setOpenShare(false)}
          message={`${process.env.REACT_APP_URL}`}
        />
      </>
    </Rosetta>
  );
};

export default SignedOutMenu;
