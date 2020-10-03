import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { MenuSideBarContainerStyled } from "../../../styled/styledNav";

import SignedInMenu from "./SignedInMenu";

type Props = {
  loggedIn: boolean;
  sideBarMenuOpened: boolean;
  toggleSideBarMenu: () => void;
};

const MenuSideBar: React.FC<Props> = ({
  sideBarMenuOpened,
  toggleSideBarMenu,
}) => {
  return (
    <MenuSideBarContainerStyled opened={sideBarMenuOpened}>
      <SignedInMenu toggleSideBarMenu={toggleSideBarMenu} />
    </MenuSideBarContainerStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state, ownProps);
  return {
    loggedIn: true,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "tournaments",
        orderBy: ["date", "desc"],
      },
    ];
  })
)(MenuSideBar);
