import React from "react";

import { Paper, PaperProps, useTheme } from "@material-ui/core";
import styled from "styled-components";

const PaperStyled = styled(Paper)`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 5px;
`;

export const PaperRC: React.FC<PaperProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <PaperStyled theme={theme} {...props}>
      {children}
    </PaperStyled>
  );
};
