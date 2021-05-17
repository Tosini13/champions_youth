import React from "react";

import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  useTheme,
} from "@material-ui/core";
import styled from "styled-components";
import { useColors } from "../themes/CustomThemeProvider";

// ######################## ICON BUTTONS ###################################

export const IconButtonStyled = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.primary};
`;
export const IconButtonRC: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <IconButtonStyled {...props} theme={theme}>
      {children}
    </IconButtonStyled>
  );
};

const ButtonStyled = styled(Button)<{
  gradient: string;
  buttoncolor: string;
}>`
  border-color: ${(props) => props.buttoncolor};
  color: ${(props) => props.buttoncolor};
`;

export const ButtonRC: React.FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const { lightGradient, buttonColor } = useColors();
  return (
    <ButtonStyled
      gradient={lightGradient}
      buttoncolor={buttonColor}
      theme={theme}
      variant="outlined"
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};
