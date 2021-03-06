import styled from "styled-components";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";

import { mainTheme } from "./styledConst";
import { Typography } from "@material-ui/core";

export const ListStyled = styled(List)`
  padding: 0px;
`;

export const MenuSideBarContainerStyled = styled.div<{ opened: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 80vw;
  z-index: 10;
  transition: transform 0.3s, box-shadow 0.5s;
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul:first-child > li,
  ul:first-child > div {
    border-bottom: ${mainTheme.palette.primary.dark} solid 0.5px;
  }
  ul:last-child > li,
  ul:last-child > div {
    border-top: ${mainTheme.palette.primary.dark} solid 0.5px;
  }

  transform: ${(props) =>
    props.opened
      ? `translateX(0%);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.6);`
      : `translateX(-100%);
        box-shadow: none;`};
`;
export const MenuLinkStyled = styled(Link)`
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const DayNavbarContainerStyled = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  color: ${mainTheme.palette.secondary.main};
  margin: 0px 5px;
  margin: auto 5px;
  height: 100%;
  overflow: hidden;
`;

export const DayNameStyled = styled(Typography)`
  margin: 0px;
  padding: 0px;
  text-align: center;
`;

export const DayDateStyled = styled(Typography)`
  margin: 0px;
  padding: 0px;
  font-size: 10px;
  text-align: center;
`;
