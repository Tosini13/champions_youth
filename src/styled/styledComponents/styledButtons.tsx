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
  specialColor: string;
}>`
  border-color: ${(props) => props.specialColor};
  color: ${(props) => props.specialColor};
`;

export const ButtonRC: React.FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const { lightGradient, specialColor } = useColors();
  return (
    <ButtonStyled
      gradient={lightGradient}
      specialColor={specialColor}
      theme={theme}
      variant="outlined"
      {...props}
    >
      {children}
    </ButtonStyled>
  );
};
