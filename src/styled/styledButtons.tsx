import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { mainTheme } from "./styledConst";

export const ButtonHorizontalContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const IconButtonNavStyled = styled(IconButton)`
  padding: 0px;
  color: ${mainTheme.palette.secondary.main};
`;

export const IconButtonBackStyled = styled(IconButton)`
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translate(-100px, 0px);
  transition: transform 0.3s, opacity 0.3s;
  color: black;
  &.btn-back-show {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

export const IconButtonStarStyled = styled(IconButton)`
  padding: 0px;
`;

export const IconButtonStyled = styled(IconButton)`
  padding: 5px;
  margin: 0px 2px;
  height: fit-content;
  width: fit-content;
`;

export const ALinkStyled = styled.a`
    text-decoration: none;
    color: ${mainTheme.palette.secondary.main};
`

export const ButtonSuccessStyled = styled(Button)`
  color: ${mainTheme.palette.success.main};
`;

export const ButtonErrorStyled = styled(Button)`
  color: ${mainTheme.palette.error.main};
`;

export const ButtonInfoStyled = styled(Button)`
  color: ${mainTheme.palette.info.main};
`;
