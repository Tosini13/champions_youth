import React from "react";
import { useTheme } from "@material-ui/core";
import styled from "styled-components";

const NavContainerStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.main};
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  z-index: 10;
  padding: 5px;
  box-sizing: border-box;
`;

export const NavContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return <NavContainerStyled theme={theme}>{children}</NavContainerStyled>;
};
