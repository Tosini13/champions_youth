import styled from "styled-components";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { mainTheme, styledColors } from "./styledConst";

export const MenuSideBarContainerStyled = styled.div<{ opened: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 80vw;
  z-index: 10;
  transition: transform 0.3s, box-shadow 0.5s;
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.main};

  transform: ${(props) =>
    props.opened
      ? `translateX(0%);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.6);`
      : `translateX(-100%);
        box-shadow: none;`};
`;

export const NavBarStyled = styled.nav`
  position: relative;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  height: 30px;
  align-items: center;
`;

export const NavContainerStyled = styled.div`
  width: 100%;
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.main};
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  z-index: 10;
`;

export const MenuLinkStyled = styled(Link)`
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const BottomNavigationStyled = styled(BottomNavigation)`
  background-color: ${mainTheme.palette.primary.main};
  max-width: 100vw;
  min-height: 55px;
  overflow: hidden;
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.24);
  z-index: 10;
`;

export const BottomNavigationActionLinkStyled = styled(Link)`
  color: ${mainTheme.palette.secondary.main};
  min-width: 0px;
  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 0.575rem;
  }
`;

export const GoldBottomNavigationActionLinkStyled = styled(
  BottomNavigationActionLinkStyled
)`
  &.MuiBottomNavigationAction-root.Mui-selected {
    color: ${styledColors.icons.tournament};
  }
`;

export const RedBottomNavigationActionLinkStyled = styled(
  BottomNavigationActionLinkStyled
)`
  &.MuiBottomNavigationAction-root.Mui-selected {
    color: ${styledColors.icons.live};
  }
`;

export const DayNavbarContainerStyled = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  color: ${mainTheme.palette.secondary.main};
  margin: 0px 5px;
  margin: auto 5px;
  height: 100%;
  overflow: hidden;
`;

export const DayNameStyled = styled.p`
  margin: 0px;
  padding: 0px;
  text-align: center;
`;

export const DayDateStyled = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 10px;
  text-align: center;
`;

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  margin: 0px;
  .MuiInputBase-root,
  .MuiFormControl-root {
    margin: 0px;
  }
  .MuiInputBase-root::before,
  .MuiInputBase-root::after {
    content: none;
  }
  .Mui-error,
  input,
  label {
    display: none;
  }
  .MuiIconButton-root {
    padding: 1.5px;
    color: ${mainTheme.palette.secondary.main};
  }
`;
