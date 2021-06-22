import React from "react";

// ================== GRID ========================

import { Grid, GridProps } from "@material-ui/core";
import styled from "styled-components";
import { LIST_CONTAINER_IOS } from "../const";

const GamesContainerStyled = styled(Grid)`
  ${LIST_CONTAINER_IOS}
`;

export const GamesContainer: React.FC<GridProps> = ({ children }) => {
  return <GamesContainerStyled container>{children}</GamesContainerStyled>;
};

const GamesItemStyled = styled(Grid)``;

export const GamesItem: React.FC<GridProps> = ({ children }) => {
  return (
    <GamesItemStyled item xs={12}>
      {children}
    </GamesItemStyled>
  );
};
