import React from "react";

import { TextFieldStyled } from "../../../styled/styledForm";
import { LocationDataForm } from "./CreateTournament";

type Props = {
  register: any;
  errors: any;
  location: LocationDataForm;
  setLocation: (basicInfo: LocationDataForm) => void;
};

const CreateTournamentLocation: React.FC<Props> = ({
  register,
  errors,
  location,
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
    <>
      <TextFieldStyled
        label="Miasto"
        value={location.city}
        onChange={handleOnChange}
        inputProps={{
          name: "city",
          ref: register({}),
        }}
        helperText={errors.name && "Złe miasto"}
        error={Boolean(errors.name)}
      />
      <TextFieldStyled
        label="Adres"
        value={location.address}
        onChange={handleOnChange}
        inputProps={{
          name: "address",
          ref: register(),
        }}
        helperText={errors.name && "Zły adres"}
        error={Boolean(errors.name)}
      />
    </>
  );
};

export default CreateTournamentLocation;
