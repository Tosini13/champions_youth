import styled from "styled-components";

import { mainTheme } from "./styledConst";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export const AddTeamFormStyled = styled.form`
  padding: 0px 5px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const TeamListStyled = styled(List)`
  padding: 2px 0px;
  margin: 5px 0px;
  width: 100%;
  div:last-child {
    border: none;
  }
`;

export const TeamListElementStyled = styled(ListItem)`
  color: ${mainTheme.palette.secondary.main};
  padding: 5px;
`;

export const TeamListNameStyled = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 0px 10px;
`;

export const TeamListItemImgStyled = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 2px;
`;
