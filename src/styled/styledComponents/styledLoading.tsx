import React from "react";
import { CircularProgress, useTheme } from "@material-ui/core";
import styled from "styled-components";

const CircularProgressStyled = styled(CircularProgress)`
  color: ${(props) => props.theme.palette.text.primary};
`;

export interface CircularProgressPropsRU {}

const CircularProgressRU: React.FC<CircularProgressPropsRU> = () => {
  const theme = useTheme();

  return <CircularProgressStyled theme={theme} />;
};

export default CircularProgressRU;
