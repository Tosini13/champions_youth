import React from "react";
import { useTheme } from "@material-ui/core";
import styled from "styled-components";

const TournamentTitleContainerStyled = styled.div`
  background: ${(props) => props.theme.palette.background.default};
  margin-top: 2px;
`;

export const TournamentTitleContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <TournamentTitleContainerStyled theme={theme}>
      {children}
    </TournamentTitleContainerStyled>
  );
};

const TournamentHeaderContainerStyled = styled.div`
  background: ${(props) => props.theme.palette.background.paper};
  width: 85%;
  margin: auto;
  padding: 0px 5px;
`;

export const TournamentHeaderContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <TournamentHeaderContainerStyled theme={theme}>
      {children}
    </TournamentHeaderContainerStyled>
  );
};

const TournamentFooterContainerStyled = styled.div`
  background: ${(props) => props.theme.palette.background.paper};
  width: 80%;
  margin: auto;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const TournamentFooterContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <TournamentFooterContainerStyled theme={theme}>
      {children}
    </TournamentFooterContainerStyled>
  );
};

const TournamentLogoContainerStyled = styled.div`
  border-radius: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5px;
  overflow: hidden;
`;

export const TournamentLogoContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <TournamentLogoContainerStyled theme={theme}>
      {children}
    </TournamentLogoContainerStyled>
  );
};
