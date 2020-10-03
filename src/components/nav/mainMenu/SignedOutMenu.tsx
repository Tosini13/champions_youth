import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Divider from "@material-ui/core/Divider";

import { MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";

type Props = {
  toggleSideBarMenu: () => void;
};

const SignedOutMenu: React.FC<Props> = ({ toggleSideBarMenu }) => {
  return (
    <List>
      <ListItem button>
        <MenuLinkStyled
          to={routerConstString.login}
          onClick={toggleSideBarMenu}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Zaloguj"} />
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
          <ListItemText primary="Zarejestruj" />
        </MenuLinkStyled>
      </ListItem>
    </List>
  );
};

export default SignedOutMenu;
