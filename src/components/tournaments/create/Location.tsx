import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";

import { TextFieldStyled } from "../../../styled/styledForm";
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
      <>
        <TextFieldStyled
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
        <TextFieldStyled
          label={<Translator id="Address" />}
          value={location.address}
          onChange={handleOnChange}
          inputProps={{
            name: "address",
            ref: register(),
          }}
          helperText={errors.name && <Translator id="wrongAddress" />}
          error={Boolean(errors.name)}
        />
      </>
    </Rosetta>
  );
};

export default CreateTournamentLocation;
