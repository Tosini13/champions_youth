import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import { ListStyled, MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import Language from "../Language";
import menuDict from "../../../locale/menu";
import { GridContainer, ListItemStyled } from "./SignedInMenu";
import { Grid } from "@material-ui/core";
import Theme from "../Theme";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  handleCloseSideBar: () => void;
};

const SignedOutMenu: React.FC<Props> = ({ handleCloseSideBar }) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <GridContainer container direction="column" justify="space-between">
        <Grid item>
          <ListStyled>
            <ListItemStyled borderposition="bottom" button>
              <ListItemIcon>
                <AccountCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={<Translator id="youAreLockedOut" />} />
              <Language />
              <Theme />
            </ListItemStyled>
          </ListStyled>
        </Grid>
        <Grid item>
          <ListStyled>
            <ListItemStyled borderposition="top" button>
              <MenuLinkStyled
                to={routerConstString.login}
                onClick={handleCloseSideBar}
              >
                <ListItemIcon>
                  <InboxIcon color="secondary" />
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
                  <DraftsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="signUp" />} />
              </MenuLinkStyled>
            </ListItemStyled>
          </ListStyled>
        </Grid>
      </GridContainer>
    </Rosetta>
  );
};

export default SignedOutMenu;
