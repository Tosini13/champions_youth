import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Button, DialogContent, Grid } from "@material-ui/core";

import { DialogStyled, DialogTitle } from "../../../styled/styledLayout";
import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";

export interface ChooseStructureProps {
  locale: LOCALE;
  opened: boolean;
  handleClose: () => void;
  chooseGroup: () => void;
  chooseBracket: () => void;
}

const ChooseStructure: React.FC<ChooseStructureProps> = ({
  locale,
  opened,
  handleClose,
  chooseGroup,
  chooseBracket,
}) => {
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <DialogStyled open={opened} onClose={handleClose}>
        <DialogTitle>
          <Translator id="chooseStructure" />
        </DialogTitle>
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
                <Translator id="groupsStructure" />
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
                <Translator id="bracketStructure" />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </Rosetta>
  );
};

export default ChooseStructure;
