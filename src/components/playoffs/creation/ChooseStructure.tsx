import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { DialogContent, Grid } from "@material-ui/core";

import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { DialogRU } from "../../../styled/styledDialog";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

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
              <ButtonRC
                onClick={() => {
                  chooseGroup();
                  handleClose();
                }}
              >
                <Translator id="groupsStructure" />
              </ButtonRC>
            </Grid>
            <Grid item>
              <ButtonRC
                onClick={() => {
                  chooseBracket();
                  handleClose();
                }}
              >
                <Translator id="bracketStructure" />
              </ButtonRC>
            </Grid>
          </Grid>
        </DialogContent>
      </DialogRU>
    </Rosetta>
  );
};

export default ChooseStructure;
