import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Backdrop } from "@material-ui/core";
import styled from "styled-components";

const BackdropStyled = styled(Backdrop)`
  z-index: 100;
`;

export interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  
  return (
    <BackdropStyled open={true}>
      <CircularProgress color="secondary" />
    </BackdropStyled>
  );
};

export default SplashScreen;
