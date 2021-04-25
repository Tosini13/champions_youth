import React from "react";
import { Grid, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { SIZE_LOGO } from "../../../components/global/Logo";

export const MatchContainerStyled = styled(Grid)`
  height: 60px;
  max-width: 300px;
  position: relative;
  margin: auto;
`;
export const MatchContainer: React.FC = ({ children }) => {
  return (
    <MatchContainerStyled
      container
      justify="center"
      alignItems="center"
      wrap="nowrap"
    >
      {children}
    </MatchContainerStyled>
  );
};

const MatchContentContainerStyled = styled.div`
  height: 25px;
  width: calc(100% - ${SIZE_LOGO.md});
  background: ${(props) => props.theme.palette.background.default};
  margin: auto;
  position: relative;
  padding: 0px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: 15px;
`;

export const MatchContentContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <MatchContentContainerStyled theme={theme}>
      {children}
    </MatchContentContainerStyled>
  );
};

// #################### HEADER ##########################

const MatchHeaderContainerStyled = styled(Grid)`
  height: 15px;
  width: 85%;
  background: ${(props) => props.theme.palette.background.paper};
  margin: auto;
  position: absolute;
  top: 0px;
  transform: translate(-50%, -100%);
  left: 50%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0px 11px;
`;

export const MatchHeaderContainer: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <MatchHeaderContainerStyled
      theme={theme}
      container
      justify="space-between"
      alignItems="flex-end"
      wrap="nowrap"
    >
      {children}
    </MatchHeaderContainerStyled>
  );
};