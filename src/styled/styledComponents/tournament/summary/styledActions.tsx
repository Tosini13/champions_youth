import React from "react";

import { IconButton, IconButtonProps, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { useColors } from "../../../themes/CustomThemeProvider";

const IconButtonStyled = styled(IconButton)`
  color: ${(props) => props.theme.palette.text.secondary};
`;

export const FavoriteIconButton: React.FC<IconButtonProps> = ({
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

const MyIconButtonStyled = styled(IconButton)<{
  livecolor: string;
}>`
  color: ${(props) => props.livecolor};
  &:hover {
    background-color: transparent;
  }
`;

export const MyIconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  const { liveColor } = useColors();
  return (
    <MyIconButtonStyled {...props} livecolor={liveColor}>
      {children}
    </MyIconButtonStyled>
  );
};
