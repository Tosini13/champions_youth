import styled from "styled-components";

import { mainTheme } from "./styledConst";

import Dialog from "@material-ui/core/Dialog";

export const MatchDetailsTeamsContainerStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const MatchDetailsResultContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MatchDetailsContainerStyled = styled(Dialog)`
  .MuiDialog-paper {
    background-color: ${mainTheme.palette.primary.main};
    color: ${mainTheme.palette.secondary.main};
  }
`;
