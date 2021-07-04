import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Rosetta, Translator } from "react-rosetta";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Share as ShareIcon,
  FlashOn,
  EmojiEvents,
  AddCircleOutline,
} from "@material-ui/icons";

import LockIcon from "@material-ui/icons/Lock";
import ListItem from "@material-ui/core/ListItem";

import { ListStyled, MenuLinkStyled } from "../../../styled/styledNav";
import { routerConstString } from "../../../const/menuConst";
import { signOut } from "../../../store/actions/AuthActions";
import { Id } from "../../../const/structuresConst";
import { UserData } from "../../../models/credentialsData";
import menuDict from "../../../locale/menu";
import styled from "styled-components";
import { Grid, Hidden } from "@material-ui/core";
import { useLocale } from "../../../Provider/LocaleProvider";
import Share from "../../share/Share";
import MenuHeader from "./MenuHeader";

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
};

const SignedInMenu: React.FC<Props> = ({
  handleCloseSideBar,
  signOut,
  user,
}) => {
  const { locale } = useLocale();
  const [openShare, setOpenShare] = useState<boolean>(false);
  const handleSignOut = () => {
    signOut();
    handleCloseSideBar();
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        <GridContainer container direction="column" justify="space-between">
          <Grid item>
            <ListStyled>
              <MenuHeader username={user?.login} />
              <Hidden smDown>
                <ListItemStyled borderposition="bottom" button>
                  <MenuLinkStyled
                    to={routerConstString.tournaments}
                    onClick={() => handleCloseSideBar()}
                  >
                    <ListItemIcon>
                      <EmojiEvents color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={<Translator id="tournaments" />} />
                  </MenuLinkStyled>
                </ListItemStyled>
              </Hidden>
              <ListItemStyled borderposition="bottom" button>
                <MenuLinkStyled
                  to={routerConstString.create}
                  onClick={() => handleCloseSideBar()}
                >
                  <ListItemIcon>
                    <AddCircleOutline color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Translator id="createTournament" />}
                  />
                </MenuLinkStyled>
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
                <ListItemIcon>
                  <FlashOn color="secondary" />
                </ListItemIcon>
                <ListItemText primary={<Translator id="version" />} /> {VERSION}
              </ListItemStyled>
              <ListItemStyled borderposition="top" button>
                <MenuLinkStyled
                  to={routerConstString.login}
                  onClick={() => handleSignOut()}
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
        <Share
          open={openShare}
          handleClose={() => setOpenShare(false)}
          message={`${process.env.REACT_APP_URL}`}
        />
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
