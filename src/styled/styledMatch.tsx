import styled from "styled-components";

import { mainTheme, styledColors } from "./styledConst";

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

export const MatchContainerStyled = styled.div`
  background-color: ${mainTheme.palette.primary.light};
  margin: 5px 0px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const MatchHeaderStyled = styled.div<{ live: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${mainTheme.palette.primary.main};
  padding: 1px 6px;
  font-size: 9px;
  text-align: center;
  color: ${mainTheme.palette.secondary.light};
  ${(props) =>
    props.live
      ? `
      color: ${styledColors.icons.live};`
      : ``}
`;

const MatchHeaderPStyled = styled.p`
  width: fit-content;
  padding: 1px 2px;
  margin: 0px;
  color: ${mainTheme.palette.secondary.main};
`;

export const MatchRoundTitleStyled = styled(MatchHeaderPStyled)``;

export const MatchRoundDateStyled = styled(MatchHeaderPStyled)``;

export const MatchMockTeamsContainerStyled = styled.div`
  padding: 2px;
  font-size: 13px;
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
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const TeamLogoStyled = styled.img`
  background-color: ${mainTheme.palette.primary.main};
  padding: 2px;
  border-radius: 5px;
  width: 40px;
  height: 40px;
`;

export const MatchDisplayTeamNameStyled = styled.p`
  font-size: 13px;
  padding: 2px 0px;
  margin: 0px;
  color: ${mainTheme.palette.secondary.dark};
  text-align: center;
`;

export const MatchDisplayResultGoalStyled = styled.p`
  background-color: ${mainTheme.palette.secondary.dark};
  color: ${mainTheme.palette.primary.main};
  border-radius: 3px;
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  margin: 0px 5px;
`;

export const LiveMarkStyled = styled.p<{ live: boolean }>`
  color: ${styledColors.icons.live};
  font-size: 15px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s;
  padding: 2px;
  margin: 0px;
  ${(props) =>
    props.live
      ? `
      opacity: 1;`
      : ``}
`;
