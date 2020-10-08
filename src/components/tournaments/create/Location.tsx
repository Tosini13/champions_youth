import React from "react";

import { TextFieldStyled } from "../../../styled/styledForm";

type Props = { register: any; errors: any };

const CreateTournamentLocation: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <TextFieldStyled
        label="Miasto"
        inputProps={{
          name: "city",
          ref: register({}),
        }}
        helperText={errors.name && "Złe miasto"}
        error={Boolean(errors.name)}
      />
      <TextFieldStyled
        label="Adres"
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
