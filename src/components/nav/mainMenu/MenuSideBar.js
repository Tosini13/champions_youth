import { Hidden } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { DrawerRC } from "../../../styled/styledComponents/navigation/styledLayout";

import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const MenuSideBar = ({ handleCloseSideBar, sideBarMenuOpened, loggedIn }) => {
  return (
    <>
      <Hidden xsDown>
        <DrawerRC
          open={sideBarMenuOpened}
          onClose={handleCloseSideBar}
          color="secondary"
          variant="permanent"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {loggedIn ? (
            <SignedInMenu handleCloseSideBar={() => handleCloseSideBar()} />
          ) : (
            <SignedOutMenu handleCloseSideBar={() => handleCloseSideBar()} />
          )}
        </DrawerRC>
      </Hidden>
      <Hidden smUp>
        <DrawerRC
          open={sideBarMenuOpened}
          onClose={handleCloseSideBar}
          color="secondary"
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {loggedIn ? (
            <SignedInMenu handleCloseSideBar={() => handleCloseSideBar()} />
          ) : (
            <SignedOutMenu handleCloseSideBar={() => handleCloseSideBar()} />
          )}
        </DrawerRC>
      </Hidden>
    </>
  );
};

const mapStateToProps = (state) => {
  const loggedIn = Boolean(state.firebase.auth.uid);
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps)(MenuSideBar);
