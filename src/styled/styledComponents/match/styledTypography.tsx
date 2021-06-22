import React from "react";

import { TypographyProps } from "@material-ui/core";
import styled from "styled-components";
import { TypographyPrimaryText } from "../styledTypography";
import { styledColors } from "../../../styled/themes/other";
import { parseStyledBoolean } from "../../../helpers/booleanParser";

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

const TypographyLiveStyled = styled(TypographyPrimaryText)<{
  islive?: string;
}>`
  transition: all 0.2s;
  color: ${styledColors.icons.live};
  font-size: 0.65rem;
  font-weight: bold;
  ${(props) => (props.islive ? "opacity: 1;" : "opacity: 0;")};
`;

type TTypographyLiveMatchHeader = TypographyProps & {
  isLive?: boolean;
};

// White/Navy
export const TypographyLiveMatchHeader: React.FC<TTypographyLiveMatchHeader> =
  ({ children, isLive, ...props }) => (
    <TypographyLiveStyled
      align="center"
      islive={parseStyledBoolean(isLive ?? false)}
      {...props}
    >
      {children}
    </TypographyLiveStyled>
  );
