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
import { connect } from "react-redux";
import menuDict from "../../../locale/menu";
import { LOCALE } from "../../../locale/config";
import { GridContainer, ListItemStyled } from "./SignedInMenu";
import { Grid } from "@material-ui/core";

type Props = {
  handleCloseSideBar: () => void;
  locale: LOCALE;
};

const SignedOutMenu: React.FC<Props> = ({ handleCloseSideBar, locale }) => {
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(SignedOutMenu);
