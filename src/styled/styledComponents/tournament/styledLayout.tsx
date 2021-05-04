import React from "react";
import styled from "styled-components";
import { useColors } from "../../themes/CustomThemeProvider";

const TournamentTitleContainerStyled = styled.div<{
  gradient: string;
}>`
  background: ${(props) => props.gradient};
  margin-top: 2px;
`;

export const TournamentTitleContainer: React.FC = ({ children }) => {
  const { darkGradient } = useColors();
  return (
    <TournamentTitleContainerStyled gradient={darkGradient}>
      {children}
    </TournamentTitleContainerStyled>
  );
};

const TournamentHeaderContainerStyled = styled.div<{
  gradient: string;
}>`
  background: ${(props) => props.gradient};
  width: 85%;
  margin: auto;
  padding: 0px 5px;
`;

export const TournamentHeaderContainer: React.FC = ({ children }) => {
  const { lightGradient } = useColors();
  return (
    <TournamentHeaderContainerStyled gradient={lightGradient}>
      {children}
    </TournamentHeaderContainerStyled>
  );
};

const TournamentFooterContainerStyled = styled.div<{
  gradient: string;
}>`
  background: ${(props) => props.gradient};
  width: 80%;
  margin: auto;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const TournamentFooterContainer: React.FC = ({ children }) => {
  const { lightGradient } = useColors();
  return (
    <TournamentFooterContainerStyled gradient={lightGradient}>
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
  return (
    <TournamentLogoContainerStyled>{children}</TournamentLogoContainerStyled>
  );
};
