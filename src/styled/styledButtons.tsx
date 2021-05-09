import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { mainTheme } from "./styledConst";

export const ButtonHorizontalContainerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const IconButtonStarStyled = styled(IconButton)`
  padding: 0px;
`;

export const IconButtonImageStyled = styled.label`
  padding: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const IconButtonStyled = styled(IconButton)`
  padding: 5px;
  margin: 0px 2px;
  height: fit-content;
  width: fit-content;
`;

export const ButtonStyled = styled(Button)`
  &.Mui-disabled {
    border-color: rgba(150, 150, 150, 0.26);
    color: rgba(150, 150, 150, 0.26);
  }
`;

export const ButtonSuccessStyled = styled(ButtonStyled)`
  color: ${mainTheme.palette.success.main};
`;

export const ButtonErrorStyled = styled(ButtonStyled)`
  color: ${mainTheme.palette.error.main};
`;

export const ButtonInfoStyled = styled(ButtonStyled)`
  color: ${mainTheme.palette.info.main};
`;

export const ButtonRemoveLogoStyled = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${mainTheme.palette.primary.main};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const ButtonIsSelected = styled(Button)<{ selected: boolean }>`
  ${(props) => (props.selected ? "color: white; border-color: white;" : ``)}
`;
