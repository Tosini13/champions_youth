import React, { useState } from "react";

import DateRangeIcon from '@material-ui/icons/DateRange';

import { NavBarStyled, NavContainerStyled } from "../../styled/styledNav";
import { IconButtonNavStyled } from "../../styled/styledButtons";
import { HamburgerStyled } from "../../styled/styledIcons";
import DayNavbar from "./TopNav.tsx/DayNavbar";
import MenuSideBar from "./mainMenu/MenuSideBar";

const Navbar = () => {
  const [sideBarMenuOpened, setSideBarMenu] = useState(false);

  const toggleSideBarMenu = () => {
    setSideBarMenu(!sideBarMenuOpened);
  };

  return (
    <>
      <NavContainerStyled>
        <NavBarStyled>
          <IconButtonNavStyled>
            <DateRangeIcon />
          </IconButtonNavStyled>
          <DayNavbar />
          <HamburgerStyled open={sideBarMenuOpened} onClick={toggleSideBarMenu}>
            <div></div>
            <div></div>
            <div></div>
          </HamburgerStyled>
        </NavBarStyled>
      </NavContainerStyled>
      <MenuSideBar
        sideBarMenuOpened={sideBarMenuOpened}
        toggleSideBarMenu={toggleSideBarMenu}
      />
    </>
  );
};

export default Navbar;
