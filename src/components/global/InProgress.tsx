import React, { useState, useEffect } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Backdrop } from "@material-ui/core";
import styled from "styled-components";

const BackdropStyled = styled(Backdrop)`
  z-index: 100;
`;

let setBoolean: (bool: boolean) => void = () => {};

export const setInProgress = (bool: boolean) => {
  setBoolean(bool);
};

export interface InProgressProps {}

const InProgress: React.FC<InProgressProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setBoolean = setOpen;
  }, []);

  return (
    <BackdropStyled open={open}>
      <CircularProgress color="secondary" />
    </BackdropStyled>
  );
};

export default InProgress;
