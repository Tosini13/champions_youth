import React from "react";
import { useTheme } from "@material-ui/core";
import styled from "styled-components";

export enum E_TAB_PLACE {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
}

const rgb = "100 100 100";

const NavContainerStyled = styled.nav<{
  place?: E_TAB_PLACE;
}>`
  z-index: 1;
  background-color: ${(props) => props.theme.palette.primary.dark};
  ${(props) =>
    props.place
      ? `box-shadow: 0 -2px 2px 0 rgb(${rgb} / 14%), 0 -3px 1px -2px rgb(${rgb} / 12%), 0 -1px 5px 0 rgb(${rgb} / 20%);`
      : `box-shadow: 0 2px 2px 0 rgb(${rgb} / 14%), 0 3px 1px -2px rgb(${rgb} / 12%), 0 1px 5px 0 rgb(${rgb} / 20%);`}
  .MuiTabs-scroller > span {
    background-color: ${(props) => props.theme.palette.text.secondary};
    ${(props) => (props.place ? "top: 0px;" : "")};
  }
`;

type TNavContainer = {
  place?: E_TAB_PLACE;
};

export const NavContainer: React.FC<TNavContainer> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <NavContainerStyled {...props} theme={theme}>
      {children}
    </NavContainerStyled>
  );
};
