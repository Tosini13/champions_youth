import React from "react";
import { IconButtonProps, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { parseStyledBoolean } from "../../../helpers/booleanParser";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import { IconButtonStyled } from "../styledButtons";

const HamburgerStyled = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25px;
  padding: 10px;
  z-index: 1500;
  > div {
    background-color: ${(props) => props.theme.palette.text.primary};
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

type THamburger = {
  open: boolean;
  toggleOpen: () => void;
};
export const Hamburger: React.FC<THamburger> = ({ open, toggleOpen }) => {
  const theme = useTheme();
  return (
    <HamburgerStyled theme={theme} open={open} onClick={toggleOpen}>
      <div></div>
      <div></div>
      <div></div>
    </HamburgerStyled>
  );
};

export const IconButtonNavStyled = styled(IconButtonStyled)`
  padding: 0px;
`;
export const IconButtonNav: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <IconButtonNavStyled {...props} theme={theme}>
      {children}
    </IconButtonNavStyled>
  );
};

// ######################## DAY NAV ###################################

export const ARROW_DAY_TRANSLATE = "20px";

export const IconButtonDayStyled = styled(IconButtonNavStyled)`
  transition: transform 0.3s, opacity 0.3s;
  transform: translateX(0px);
  opacity: 1;
`;

type TIconButtonDay = IconButtonProps & {
  active: boolean;
};

export const IconButtonPreviosDayStyled = styled(IconButtonDayStyled)<{
  active?: string;
}>`
  ${(props) =>
    props.active
      ? ""
      : `transform: translateX(${ARROW_DAY_TRANSLATE}); opacity: 0; z-index: 0;`}
`;

export const IconButtonPreviosDay: React.FC<TIconButtonDay> = ({
  children,
  active,
  ...props
}) => {
  const theme = useTheme();
  return (
    <IconButtonPreviosDayStyled
      {...props}
      theme={theme}
      active={parseStyledBoolean(active)}
    >
      {children}
    </IconButtonPreviosDayStyled>
  );
};

export const IconButtonNextDayStyled = styled(IconButtonDayStyled)<{
  active?: string;
}>`
  ${(props) =>
    props.active
      ? ""
      : `transform: translateX(-${ARROW_DAY_TRANSLATE}); opacity: 0; z-index: 0;`}
`;

export const IconButtonNextDay: React.FC<TIconButtonDay> = ({
  children,
  active,
  ...props
}) => {
  const theme = useTheme();
  return (
    <IconButtonNextDayStyled
      {...props}
      theme={theme}
      active={parseStyledBoolean(active)}
    >
      {children}
    </IconButtonNextDayStyled>
  );
};

// ######################## CALENDAR ICON ###################################

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  margin: 0px;
  .MuiInputBase-root,
  .MuiFormControl-root {
    margin: 0px;
  }
  .MuiInputBase-root::before,
  .MuiInputBase-root::after {
    content: none;
  }
  .Mui-error,
  input,
  label {
    display: none;
  }
  .MuiIconButton-root {
    padding: 1.5px;
    color: ${(props) => props.theme.palette.text.primary};
  }
  .MuiInputAdornment-root {
    height: 100%;
  }
`;

export const CalendarPicker: React.FC<KeyboardDatePickerProps> = ({
  ...props
}) => {
  const theme = useTheme();
  return <KeyboardDatePickerStyled {...props} theme={theme} />;
};
