import React from "react";

import { Typography, TypographyProps, useTheme } from "@material-ui/core";
import styled from "styled-components";

// White/Navy
export const TypographyPrimaryText: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <Typography color="textPrimary" {...props}>
    {children}
  </Typography>
);

export const ALinkStyled = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.palette.text.primary};
`;

type TALink = {
  href: string;
  target: string;
};

export const ALink: React.FC<TALink> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <ALinkStyled theme={theme} {...props}>
      {children}
    </ALinkStyled>
  );
};
