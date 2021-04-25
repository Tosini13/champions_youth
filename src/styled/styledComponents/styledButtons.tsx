import React from "react";

import { IconButton, IconButtonProps, useTheme } from "@material-ui/core";
import styled from "styled-components";

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
