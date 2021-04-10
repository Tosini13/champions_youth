import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Button, DialogContent, Grid } from "@material-ui/core";

import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { DialogRU } from "../../../styled/styledDialog";

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
      <DialogRU
        open={opened}
        onClose={handleClose}
        title={"chooseStructure"}
        locale={locale}
      >
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
      </DialogRU>
    </Rosetta>
  );
};

export default ChooseStructure;
