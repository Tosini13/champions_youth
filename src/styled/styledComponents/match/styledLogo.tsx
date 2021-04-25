import React from "react";

import { useTheme } from "@material-ui/core";
import styled from "styled-components";
import { EThemes } from "../../themes/CustomThemeProvider";

const LogoContainerStyled = styled.div`
  position: absolute;
  border-radius: 5px;
  overflow: hidden;
  ${(props) =>
    props.theme.palette?.type === EThemes.dark
      ? `
    background: radial-gradient(
      50% 50% at 50% 50%,
      #001626 0%,
      rgba(0, 22, 38, 0.567708) 49.48%,
      rgba(0, 22, 38, 0.222401) 86.98%,
      rgba(0, 22, 38, 0) 100%
    );`
      : ""};
  ${(props) =>
    props.theme.palette?.type === EThemes.light
      ? `
      background: radial-gradient(50% 50% at 50% 50%, #EBEBEB 0%, rgba(235, 235, 235, 0.567708) 49.48%, rgba(235, 235, 235, 0.222401) 86.98%, rgba(235, 235, 235, 0) 100%);
      `
      : ""};
`;

const HomeLogoContainerStyled = styled(LogoContainerStyled)`
  left: 0px;
`;

const AwayLogoContainerStyled = styled(LogoContainerStyled)`
  right: 0px;
`;

export const HomeLogoContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <HomeLogoContainerStyled theme={theme}>{children}</HomeLogoContainerStyled>
  );
};

export const AwayLogoContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <AwayLogoContainerStyled theme={theme}>{children}</AwayLogoContainerStyled>
  );
};
