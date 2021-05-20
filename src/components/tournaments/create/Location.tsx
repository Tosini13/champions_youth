import { Grid } from "@material-ui/core";
import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";

import { TextFieldRC } from "../../../styled/styledComponents/styledForm";
import { LocationDataForm } from "./CreateTournament";

type Props = {
  register: any;
  errors: any;
  location: LocationDataForm;
  locale: LOCALE;
  setLocation: (basicInfo: LocationDataForm) => void;
};

const CreateTournamentLocation: React.FC<Props> = ({
  register,
  errors,
  location,
  locale,
  setLocation,
}) => {
  const handleOnChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocation({
      ...location,
      [element.target.name]: element.target.value,
    });
  };
  return (
    <Rosetta translations={createTournamentDict} locale={locale}>
      <Grid container justify="space-evenly">
        <Grid item>
          <TextFieldRC
            label={<Translator id="city" />}
            value={location.city}
            onChange={handleOnChange}
            inputProps={{
              name: "city",
              ref: register({}),
            }}
            helperText={errors.name && <Translator id="wrongCity" />}
            error={Boolean(errors.name)}
          />
        </Grid>
        <Grid item>
          <TextFieldRC
            label={<Translator id="address" />}
            value={location.address}
            onChange={handleOnChange}
            inputProps={{
              name: "address",
              ref: register(),
            }}
            helperText={errors.name && <Translator id="wrongAddress" />}
            error={Boolean(errors.name)}
          />
        </Grid>
      </Grid>
    </Rosetta>
  );
};

export default CreateTournamentLocation;
