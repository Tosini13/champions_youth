import React from "react";
import { connect } from "react-redux";

import { MenuSideBarContainerStyled } from "../../../styled/styledNav";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

type Props = {
  loggedIn: boolean;
  sideBarMenuOpened: boolean;
  toggleSideBarMenu: () => void;
};

const MenuSideBar: React.FC<Props> = ({
  sideBarMenuOpened,
  toggleSideBarMenu,
  loggedIn,
}) => {
  return (
    <MenuSideBarContainerStyled opened={sideBarMenuOpened}>
      {loggedIn ? (
        <SignedInMenu toggleSideBarMenu={toggleSideBarMenu} />
      ) : (
        <SignedOutMenu toggleSideBarMenu={toggleSideBarMenu} />
      )}
    </MenuSideBarContainerStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const loggedIn = Boolean(state.firebase.auth.uid);
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps)(MenuSideBar);
