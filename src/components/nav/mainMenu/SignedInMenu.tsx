import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Rosetta, Translator } from "react-rosetta";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FlashOnIcon from "@material-ui/icons/FlashOn";
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
import styled from "styled-components";
import { Grid } from "@material-ui/core";

type BorderPosition = "bottom" | "top";

const VERSION = process.env.REACT_APP_VERSION;

export const GridContainer = styled(Grid)`
  height: 100%;
`;

export const ListItemStyled = styled(ListItem)<{
  borderposition: BorderPosition;
}>`
  border-${(props) => props.borderposition}: rgba(0, 0, 0, 0.2) solid 0.5px;
`;

type Props = {
  signOut: () => void;
  handleCloseSideBar: () => void;
  user: UserData | undefined;
  locale: LOCALE;
};

const SignedInMenu: React.FC<Props> = ({
  handleCloseSideBar,
  signOut,
  user,
  locale,
}) => {
  const handleSignOut = () => {
    signOut();
    handleCloseSideBar();
  };
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <GridContainer container direction="column" justify="space-between">
        <Grid item>
          <ListStyled>
            <ListItemStyled borderposition="bottom" button>
              <ListItemIcon>
                <AccountCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={user?.login} />
              <Language />
            </ListItemStyled>
            <ListItemStyled borderposition="bottom" button>
              <MenuLinkStyled
                to={routerConstString.create}
                onClick={handleCloseSideBar}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="createTournament" />} />
              </MenuLinkStyled>
            </ListItemStyled>
          </ListStyled>
        </Grid>
        <Grid item>
          <ListStyled>
            <ListItemStyled borderposition="top" button>
              <ListItemIcon>
                <FlashOnIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={<Translator id="version" />} /> {VERSION}
            </ListItemStyled>
            <ListItemStyled borderposition="top" button>
              <MenuLinkStyled
                to={routerConstString.login}
                onClick={handleSignOut}
              >
                <ListItemIcon>
                  <LockIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="logOut" />} />
              </MenuLinkStyled>
            </ListItemStyled>
          </ListStyled>
        </Grid>
      </GridContainer>
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
