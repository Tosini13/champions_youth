import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LockIcon from "@material-ui/icons/Lock";
import ListItem from "@material-ui/core/ListItem";

import { MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import { signOut } from "../../../store/actions/AuthActions";
import { Id } from "../../../const/structuresConst";
import { UserData } from "../../../models/credentialsData";

type Props = {
  signOut: () => void;
  toggleSideBarMenu: () => void;
  user: UserData | undefined;
};

const SignedInMenu: React.FC<Props> = ({
  toggleSideBarMenu,
  signOut,
  user,
}) => {
  const handleSignOut = () => {
    signOut();
    toggleSideBarMenu();
  };
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={user?.login} />
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
        <MenuLinkStyled to={routerConstString.login} onClick={handleSignOut}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Wyloguj" />
        </MenuLinkStyled>
      </ListItem>
    </List>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state, ownProps);
  const users: UserData[] = state.firestore.ordered.users;
  const userId: Id = state.firebase.auth.uid;
  let user: UserData | undefined = undefined;
  if (users?.length) {
    user = users.find((user: UserData) => user.id === userId);
  }
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "users",
      },
    ];
  })
)(SignedInMenu);
