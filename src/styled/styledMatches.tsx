import styled from "styled-components";

import { mainTheme } from "./styledConst";

export const BracketMatchTeamsContainerStyled = styled.div`
  color: ${mainTheme.palette.secondary.main};
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(7, 1fr);
  > p:nth-child(1) {
    grid-column: 1/4;
    justify-content: flex-end;
    text-align: right;
  }
  > p:nth-child(2) {
    grid-column: 4/5;
  }
  > p:nth-child(3) {
    grid-column: 5/8;
    justify-content: flex-start;
  }
  > p {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BracketMatchMockTeamsContainerStyled = styled.div`
  color: ${mainTheme.palette.secondary.main};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  > p:nth-child(1) {
    grid-column: 1/4;
    justify-content: flex-end;
    text-align: right;
  }
  > p:nth-child(2) {
    grid-column: 4/5;
  }
  > p:nth-child(3) {
    grid-column: 5/8;
    justify-content: flex-start;
  }
  > p {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BracketMatchContainerStyled = styled.div`
  background-color: ${mainTheme.palette.primary.main};
  margin: 3px 0px;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const MatchTeamsAndResultStyled = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const MatchResultContainerStyled = styled.div`
  margin: auto;
  display: flex;
  max-width: 60px;
  justify-content: space-between;
  margin-left: 3px;
`;

export const MatchResultScoreStyled = styled.p`
  background-color: ${mainTheme.palette.primary.dark};
  border-radius: 2px;
  margin: 1px;
  width: 23px;
  height: 23px;
`;
