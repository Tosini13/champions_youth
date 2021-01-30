import React from "react";

import { Button, DialogContent, Grid } from "@material-ui/core";

import { DialogStyled, DialogTitle } from "../../../styled/styledLayout";

export interface ChooseStructureProps {
  opened: boolean;
  handleClose: () => void;
  chooseGroup: () => void;
  chooseBracket: () => void;
}

const ChooseStructure: React.FC<ChooseStructureProps> = ({
  opened,
  handleClose,
  chooseGroup,
  chooseBracket,
}) => {
  return (
    <DialogStyled open={opened} onClose={handleClose}>
      <DialogTitle>Choose Structure</DialogTitle>
      <DialogContent>
        <Grid container justify="space-around">
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                chooseGroup();
                handleClose();
              }}
            >
              Groups
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                chooseBracket();
                handleClose();
              }}
            >
              Bracket
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </DialogStyled>
  );
};

export default ChooseStructure;
