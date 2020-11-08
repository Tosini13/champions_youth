import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Backdrop } from "@material-ui/core";

export interface SplashScreenProps {}

const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default SplashScreen;
