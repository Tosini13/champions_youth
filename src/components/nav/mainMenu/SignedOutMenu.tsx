import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Divider from "@material-ui/core/Divider";

import { MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import Language from "../Language";
import { connect } from "react-redux";
import menuDict from "../../../locale/menu";
import { LOCALE } from "../../../locale/config";

type Props = {
  toggleSideBarMenu: () => void;
  locale: LOCALE;
};

const SignedOutMenu: React.FC<Props> = ({ toggleSideBarMenu, locale }) => {
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={<Translator id="createTournament" />} />
          <Language />
        </ListItem>
        <ListItem button>
          <MenuLinkStyled
            to={routerConstString.login}
            onClick={toggleSideBarMenu}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={<Translator id="signIn" />} />
          </MenuLinkStyled>
        </ListItem>
        <Divider />
        <ListItem button>
          <MenuLinkStyled
            to={routerConstString.signUp}
            onClick={toggleSideBarMenu}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary={<Translator id="signUp" />} />
          </MenuLinkStyled>
        </ListItem>
      </List>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(SignedOutMenu);
