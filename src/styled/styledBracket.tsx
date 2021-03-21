import styled from "styled-components";

import FormGroup from "@material-ui/core/FormGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { mainTheme, styledColors } from "./styledConst";
import { ScrollBarStyled } from "./styledScrollBar";

export const BracketSectionContainerStyled = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const WholeBracketContainerStyled = styled.div`
  display: flex;
  overflow-x: auto;
`;

export const BracketNavStyled = styled.div`
  display: flex;
  background-color: ${mainTheme.palette.primary.dark};
  color: ${mainTheme.palette.secondary.main};
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
`;

export const BracketNavMenuStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const BracketNavItemStyled = styled.p<{ selected: boolean }>`
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 2px;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${mainTheme.palette.primary.main};
  }
  ${(props) =>
    props.selected
      ? `
      background-color: ${mainTheme.palette.primary.main};
      color: ${mainTheme.palette.secondary.main};`
      : ``}
`;

export const BracketNavSelectStyled = styled(FormGroup)`
  margin: 10px 5px 0px 5px;
  min-width: 100px;
  align-items: center;
`;

export const ChooseListStyled = styled(List)`
  max-height: 50vh;
  overflow: auto;
  margin: 5px 0px;
  ${ScrollBarStyled}
`;

export const ChooseListItemStyled = styled(ListItem)`
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.main};
  border-radius: 3px;
  padding: 0px 5px;
  margin: 4px 0px;
  &:hover {
    background-color: ${mainTheme.palette.primary.main};
  }
`;

export const ChooseListItemSecondaryActionStyled = styled(
  ListItemSecondaryAction
)`
  right: 0px;
`;

export const ListItemTextStyled = styled(ListItemText)`
  > .MuiTypography-body1 {
    font-size: 0.8rem;
  }
`;

export const BracketRoundTitleStyled = styled.div<{ live: boolean }>`
  font-size: 9px;
  color: ${mainTheme.palette.secondary.dark};
  ${(props) =>
    props.live
      ? `
      color: ${styledColors.icons.live};`
      : ``}
`;

export const BracketRoundsContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const BracketRoundContainerStyled = styled.div`
  text-align: center;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 3px;
  width: 100%;
  min-width: 270px;
  max-width: 325px;
`;
