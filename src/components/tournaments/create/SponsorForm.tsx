import { Grid } from "@material-ui/core";
import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";

import { TextFieldRC } from "../../../styled/styledComponents/styledForm";
import { TSponsorDataForm } from "./CreateTournament";

type Props = {
  register: any;
  errors: any;
  sponsor: TSponsorDataForm;
  locale: LOCALE;
  setSponsor: (basicInfo: TSponsorDataForm) => void;
};

const SponsorForm: React.FC<Props> = ({
  register,
  errors,
  sponsor,
  locale,
  setSponsor,
}) => {
  const handleOnChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSponsor({
      ...sponsor,
      [element.target.name]: element.target.value,
    });
  };
  return (
    <Rosetta translations={createTournamentDict} locale={locale}>
      <Grid container justify="space-evenly">
        <Grid item>
          <TextFieldRC
            label={<Translator id="sponsor" />}
            value={sponsor.sponsor}
            onChange={handleOnChange}
            inputProps={{
              name: "sponsor",
              ref: register({}),
            }}
            helperText={errors.sponsor && <Translator id="required" />}
            error={Boolean(errors.sponsor)}
          />
        </Grid>
      </Grid>
    </Rosetta>
  );
};

export default SponsorForm;
