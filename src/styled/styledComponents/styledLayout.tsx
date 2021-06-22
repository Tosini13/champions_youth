import React from "react";
import { useTheme } from "@material-ui/core";
import styled from "styled-components";

const MainContainerStyled = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex-grow: 1;
  background-color: ${(props) => props.theme.palette.primary.dark};
  position: relative;
  overflow: hidden;
`;

export const MainContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return <MainContainerStyled theme={theme}>{children}</MainContainerStyled>;
};
