import React from "react";

import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LockIcon from "@material-ui/icons/Lock";
import ListItem from "@material-ui/core/ListItem";

import { MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";

type Props = {
  toggleSideBarMenu: () => void;
};

const SignedInMenu: React.FC<Props> = ({ toggleSideBarMenu }) => {
  const userLoggedIn = "admin";
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={userLoggedIn} />
      </ListItem>
      <ListItem>
        <MenuLinkStyled
          to={routerConstString.create}
          onClick={toggleSideBarMenu}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Stwórz turniej" />
        </MenuLinkStyled>
      </ListItem>
      <ListItem button>
        <MenuLinkStyled
          to={routerConstString.login}
          onClick={toggleSideBarMenu}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Wyloguj" />
        </MenuLinkStyled>
      </ListItem>
    </List>
  );
};

export default SignedInMenu;
