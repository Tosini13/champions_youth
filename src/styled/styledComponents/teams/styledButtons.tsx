import React from "react";
import { IconButton, IconButtonProps, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { useColors } from "../../themes/CustomThemeProvider";

const TeamItemIconButtonStyled = styled(IconButton)<{
  buttoncolor: string;
}>`
  color: ${(props) => props.buttoncolor};
  //   background-color: ${(props) => props.theme.palette.primary.main};
`;

export const TeamItemIconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  const { buttonColor } = useColors();
  const theme = useTheme();
  return (
    <TeamItemIconButtonStyled
      buttoncolor={buttonColor}
      theme={theme}
      {...props}
    >
      {children}
    </TeamItemIconButtonStyled>
  );
};
