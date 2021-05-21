import React from "react";

import styled from "styled-components";

import { Grid, GridProps, useTheme } from "@material-ui/core";
import { LogoContainerStyled } from "../match/styledLogo";
import { useColors } from "../../themes/CustomThemeProvider";
import { SIZE_LOGO } from "../../../components/global/Logo";

// ================== GRID ========================

const TeamsListStyled = styled(Grid)``;

export const TeamsList: React.FC<GridProps> = ({ children }) => {
  return <TeamsListStyled container>{children}</TeamsListStyled>;
};

const TeamsItemStyled = styled(Grid)``;

export const TeamsItem: React.FC<GridProps> = ({ children }) => {
  return (
    <TeamsItemStyled item xl={6} xs={12}>
      {children}
    </TeamsItemStyled>
  );
};

// ================== TEAM SUMMARY ========================

export const TeamContainerStyled = styled(Grid)`
  position: relative;
  margin: auto;
`;
export const TeamContainer: React.FC = ({ children }) => {
  return (
    <TeamContainerStyled
      container
      justify="center"
      alignItems="center"
      wrap="nowrap"
    >
      {children}
    </TeamContainerStyled>
  );
};

const TeamLogoContainerStyled = styled(LogoContainerStyled)`
  left: 0px;
  transform: translateY(-25%);
`;

export const TeamLogoContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <TeamLogoContainerStyled theme={theme}>{children}</TeamLogoContainerStyled>
  );
};

const TeamContentContainerStyled = styled.div<{
  gradient: string;
}>`
  height: 25px;
  width: calc(100% - ${SIZE_LOGO.md});
  background: ${(props) => props.gradient};
  margin: auto;
  position: relative;
  padding: 0px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: 15px;
  text-align: center;
`;

export const TeamContentContainer: React.FC = ({ children }) => {
  const { darkGradient } = useColors();
  return (
    <TeamContentContainerStyled gradient={darkGradient}>
      {children}
    </TeamContentContainerStyled>
  );
};

const ChooseTeamContentContainerStyled = styled(TeamContentContainerStyled)<{
  gradient: string;
}>`
  background: ${(props) => props.gradient};
`;

type TChooseTeamContentContainer = {
  isRestricted: boolean;
};

export const ChooseTeamContentContainer: React.FC<TChooseTeamContentContainer> =
  ({ children, isRestricted }) => {
    const { darkGradient, lightGradient } = useColors();
    return (
      <ChooseTeamContentContainerStyled
        gradient={isRestricted ? lightGradient : darkGradient}
      >
        {children}
      </ChooseTeamContentContainerStyled>
    );
  };

const TeamActionContainerStyled = styled(Grid)`
  position: absolute;
  right: 5px;
  top: 0%;
  transform: translateY(-25%);
  width: fit-content;
`;

export const TeamActionContainer: React.FC = ({ children }) => {
  return (
    <TeamActionContainerStyled
      container
      justify="center"
      alignItems="center"
      wrap="nowrap"
    >
      {children}
    </TeamActionContainerStyled>
  );
};
