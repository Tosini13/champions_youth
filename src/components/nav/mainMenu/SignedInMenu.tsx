import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Rosetta, Translator } from "react-rosetta";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import LockIcon from "@material-ui/icons/Lock";
import ListItem from "@material-ui/core/ListItem";

import { ListStyled, MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import { signOut } from "../../../store/actions/AuthActions";
import { Id } from "../../../const/structuresConst";
import { UserData } from "../../../models/credentialsData";
import Language from "../Language";
import menuDict from "../../../locale/menu";
import { LOCALE } from "../../../locale/config";

type Props = {
  signOut: () => void;
  toggleSideBarMenu: () => void;
  user: UserData | undefined;
  locale: LOCALE;
};

const SignedInMenu: React.FC<Props> = ({
  toggleSideBarMenu,
  signOut,
  user,
  locale,
}) => {
  const handleSignOut = () => {
    signOut();
    toggleSideBarMenu();
  };
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        <ListStyled>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={user?.login} />
            <Language />
          </ListItem>
          <ListItem button>
            <MenuLinkStyled
              to={routerConstString.create}
              onClick={toggleSideBarMenu}
            >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={<Translator id="createTournament" />} />
            </MenuLinkStyled>
          </ListItem>
        </ListStyled>
        <ListStyled>
          <ListItem button>
            <MenuLinkStyled
              to={routerConstString.login}
              onClick={handleSignOut}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary={<Translator id="logOut" />} />
            </MenuLinkStyled>
          </ListItem>
        </ListStyled>
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const users: UserData[] = state.firestore.ordered.users;
  const userId: Id = state.firebase.auth.uid;
  let user: UserData | undefined = undefined;
  if (users?.length) {
    user = users.find((user: UserData) => user.id === userId);
  }
  return {
    user,
    locale: state.dictionary.locale,
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
