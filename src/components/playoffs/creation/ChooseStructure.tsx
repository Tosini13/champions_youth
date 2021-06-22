import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { DialogContent, Grid } from "@material-ui/core";

import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";
import { useLocale } from "../../../Provider/LocaleProvider";

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
  const { locale } = useLocale();
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <DialogRU open={opened} onClose={handleClose} title={"chooseStructure"}>
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
