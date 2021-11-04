import React from "react";

import { Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "../../styled/styledConst";

const PaperStyled = styled(Paper)`
  background-color: transparent;
  padding: 5px;
`;

const TypographyStyled = styled(Typography)`
  font-size: 15px;
  color: ${mainTheme.palette.secondary.dark};
`;

export interface InfoStaticProps {}

const InfoStatic: React.FC<InfoStaticProps> = ({ children }) => {
  return (
    <PaperStyled elevation={0}>
      <TypographyStyled color="secondary" align="center">
        {children}
      </TypographyStyled>
    </PaperStyled>
  );
};

export default InfoStatic;
