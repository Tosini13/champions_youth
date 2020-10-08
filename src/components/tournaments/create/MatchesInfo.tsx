import React from "react";

import {
  TextFieldStyled,
  FormControlStyled,
  FormLabelStyled,
} from "../../../styled/styledForm";
import FormGroup from "@material-ui/core/FormGroup";

type Props = { register: any; errors: any };

const CreateTournamentMatchesInfo: React.FC<Props> = ({ register, errors }) => {
  return (
    <FormControlStyled>
      <FormGroup style={{ marginRight: "10px" }}>
        <FormLabelStyled>Czas w fazie grupowej (min):</FormLabelStyled>
        <TextFieldStyled
          label="Mecz"
          type="number"
          inputProps={{
            name: "matchTimeInGroup",
            ref: register({}),
          }}
          helperText={errors.name && "Nieodpowiedni czas"}
          error={Boolean(errors.name)}
        />
        <TextFieldStyled
          label="Przerwa"
          type="number"
          inputProps={{
            name: "breakTimeInGroup",
            ref: register(),
          }}
          helperText={errors.name && "Nieodpowiedni czas"}
          error={Boolean(errors.name)}
        />
      </FormGroup>
      <FormGroup style={{ marginLeft: "10px" }}>
        <FormLabelStyled>Czas w fazie pucharowej (min):</FormLabelStyled>
        <TextFieldStyled
          label="Mecz"
          type="number"
          inputProps={{
            name: "matchTimeInBracket",
            ref: register({}),
          }}
          helperText={errors.name && "Nieodpowiedni czas"}
          error={Boolean(errors.name)}
        />
        <TextFieldStyled
          label="Przerwa"
          type="number"
          inputProps={{
            name: "breakTimeInBracket",
            ref: register(),
          }}
          helperText={errors.name && "Nieodpowiedni czas"}
          error={Boolean(errors.name)}
        />
      </FormGroup>
    </FormControlStyled>
  );
};

export default CreateTournamentMatchesInfo;
