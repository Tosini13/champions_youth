import React from "react";

import { Typography, TypographyProps } from "@material-ui/core";

// White/Navy
export const TypographyPrimaryText: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <Typography color="textPrimary" {...props}>
    {children}
  </Typography>
);
