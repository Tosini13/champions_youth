import styled from "styled-components";

import { mainTheme } from "./styledConst";

export const TournamentDetailsInfoStyled = styled.div`
  color: black;
  display: flex;
  align-items: center;
  padding: 3px 0px;
`;

export const TournamentDetailsInfoContentStyled = styled.p`
  color: ${mainTheme.palette.secondary.light};
  font-size: 15px;
  margin: 5px;
  margin-left: 10px;
`;

export const MainContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MainContainerContentStyled = styled.div`
  flex-grow: 1;
`;
