import React from "react";
import {
  BottomNavigation,
  BottomNavigationProps,
  Drawer,
  DrawerProps,
  useTheme,
} from "@material-ui/core";
import styled from "styled-components";
import { Link, LinkProps } from "react-router-dom";
import { styledColors } from "../../themes/other";

// ######################## NAV TOP ###########################

// box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
const NavContainerStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.text.primary};
  border-bottom: 1px solid ${(props) => props.theme.palette.primary.dark};
  z-index: 10;
  padding: 5px;
  box-sizing: border-box;
`;

export const NavContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return <NavContainerStyled theme={theme}>{children}</NavContainerStyled>;
};

// ######################## NAV BOTTOM ###########################

const NavBottomContainerStyled = styled(NavContainerStyled)`
  padding: 0px;
`;

export const NavBottomContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <NavBottomContainerStyled theme={theme}>
      {children}
    </NavBottomContainerStyled>
  );
};

export const BottomNavigationStyled = styled(BottomNavigation)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.text.primary};
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.24);
  z-index: 10;
`;

export const BottomNavigationRC: React.FC<BottomNavigationProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <BottomNavigationStyled {...props} theme={theme}>
      {children}
    </BottomNavigationStyled>
  );
};

export const BottomNavigationActionLinkStyled = styled(Link)`
  color: ${(props) => props.theme.palette.text.primary};
  min-width: 0px;
  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 0.575rem;
  }
`;

export const MainBottomNavigationActionLinkStyled = styled(
  BottomNavigationActionLinkStyled
)`
  &.MuiBottomNavigationAction-root.Mui-selected {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

export const LiveBottomNavigationActionLinkStyled = styled(
  BottomNavigationActionLinkStyled
)`
  &.MuiBottomNavigationAction-root.Mui-selected {
    color: ${styledColors.icons.live};
  }
`;

export const NavBottomLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <MainBottomNavigationActionLinkStyled {...props} theme={theme}>
      {children}
    </MainBottomNavigationActionLinkStyled>
  );
};

export const NavBottomLiveLink: React.FC<LinkProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <LiveBottomNavigationActionLinkStyled {...props} theme={theme}>
      {children}
    </LiveBottomNavigationActionLinkStyled>
  );
};

// ######################## MAIN MENU ###########################

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: ${(props) => props.theme.palette.primary.dark};
    color: ${(props) => props.theme.palette.text.primary};
    width: 250px;
  }
`;

export const DrawerRC: React.FC<DrawerProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <DrawerStyled {...props} theme={theme}>
      {children}
    </DrawerStyled>
  );
};
