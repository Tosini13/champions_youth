import React from "react";
import { MenuSideBarContainerStyled } from "../../../styled/styledNav";

import SignedInMenu from "./SignedInMenu";

type Props = {
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

export default MenuSideBar;
