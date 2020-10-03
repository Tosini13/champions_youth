import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Divider from "@material-ui/core/Divider";

import { MenuLinkStyled } from "../../../styled/styledNav";

const SignedOutMenu = () => {
  return (
    <List>
      <ListItem button>
        <MenuLinkStyled to={"/signin"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Zaloguj"} />
        </MenuLinkStyled>
      </ListItem>
      <Divider />
      <ListItem button>
        <MenuLinkStyled to={"/"}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Turnieje" />
        </MenuLinkStyled>
      </ListItem>
    </List>
  );
};

export default SignedOutMenu;
