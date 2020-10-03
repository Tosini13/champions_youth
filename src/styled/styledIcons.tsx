import styled from "styled-components";

import { mainTheme } from "./styledConst";

export const HamburgerStyled = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25px;
  > div {
    background-color: ${mainTheme.palette.secondary.main};
    width: 100%;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0px;
    }
    transition: transform 0.3s, width 0.5s;
  }
  ${(props) =>
    props.open
      ? `
    >div:first-child{
        transform: rotateZ(45deg) translate(5px, 5px);
    }
    >div:last-child{
        transform: rotateZ(-45deg) translate(5px, -5px);
    }
    >div:nth-child(2){
        width: 0px;
    }`
      : ``}
`;
