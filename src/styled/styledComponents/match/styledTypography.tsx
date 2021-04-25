import React from "react";

import { TypographyProps } from "@material-ui/core";
import styled from "styled-components";
import { TypographyPrimaryText } from "../styledTypography";
import { styledColors } from "../../../styled/themes/other";

const TypographyPrimaryTextStyled = styled(TypographyPrimaryText)`
  font-size: 0.6rem;
  text-transform: uppercase;
`;

// White/Navy
export const TypographyMatchHeader: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <TypographyPrimaryTextStyled {...props}>
    {children}
  </TypographyPrimaryTextStyled>
);

const TypographyLiveStyled = styled(TypographyPrimaryText)`
  color: ${styledColors.icons.live};
  font-size: 0.65rem;
  font-weight: bold;
`;
// White/Navy
export const TypographyLiveMatchHeader: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <TypographyLiveStyled align="center" {...props}>
    {children}
  </TypographyLiveStyled>
);
