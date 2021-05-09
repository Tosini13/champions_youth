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
}>`
  color: wheat;
  color: ${(props) => props.theme.palette.text.primary};
  background: ${(props) => props.gradient};
  width: fit-content;
  padding: 5px 15px;
  border-radius: 5px;
  border: 0.3px solid ${(props) => props.theme.palette.primary.dark};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const ButtonRC: React.FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const { lightGradient } = useColors();
  return (
    <ButtonStyled gradient={lightGradient} theme={theme} {...props}>
      {children}
    </ButtonStyled>
  );
};
