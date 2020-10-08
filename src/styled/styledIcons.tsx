import styled from "styled-components";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";

import { mainTheme } from "./styledConst";

export const HamburgerStyled = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 5px;
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

export const TeamsListIconButtonStyled = styled(IconButton)`
  padding-right: 0px;
`;

export const DeleteIconStyled = styled(DeleteIcon)`
  color: ${mainTheme.palette.error.dark};
`;

export const EditIconStyled = styled(EditIcon)`
  color: ${mainTheme.palette.info.light};
`;

export const AddIconStyled = styled(AddIcon)`
  color: ${mainTheme.palette.success.light};
`;

export const DoneIconStyled = styled(DoneIcon)`
  color: ${mainTheme.palette.success.light};
`;

export const ClearIconStyled = styled(ClearIcon)`
  color: ${mainTheme.palette.error.dark};
`;
