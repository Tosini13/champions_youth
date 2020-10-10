import React from "react";

import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";

import {
  TextFieldStyled,
  FormControlStyled,
  FormLabelStyled,
  FormControlLabelStyled,
} from "../../../styled/styledForm";
import { MatchesInfoForm } from "./CreateTournament";

type Props = {
  register: any;
  errors: any;
  matchesInfo: MatchesInfoForm;
  setMatchesInfo: (matchesInfo: MatchesInfoForm) => void;
};

const CreateTournamentMatchesInfo: React.FC<Props> = ({
  register,
  errors,
  matchesInfo,
  setMatchesInfo,
}) => {
  const handleToggleDisabled = () => {
    setMatchesInfo({
      ...matchesInfo,
      disabled: !matchesInfo.disabled,
    });
  };

  const handleOnChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMatchesInfo({
      ...matchesInfo,
      [element.target.name]: element.target.value,
    });
  };

  return (
    <>
      <FormControlLabelStyled
        control={
          <Switch
            checked={!matchesInfo.disabled}
            onChange={handleToggleDisabled}
          />
        }
        label="Czas meczy i przerw"
      />
      <FormControlStyled>
        <FormGroup style={{ marginRight: "10px" }}>
          <FormLabelStyled>Faza grupowa (min):</FormLabelStyled>
          <TextFieldStyled
            label="Mecz"
            type="number"
            value={matchesInfo.matchTimeInGroup}
            onChange={handleOnChange}
            disabled={matchesInfo.disabled}
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
            value={matchesInfo.breakTimeInGroup}
            onChange={handleOnChange}
            disabled={matchesInfo.disabled}
            inputProps={{
              name: "breakTimeInGroup",
              ref: register(),
            }}
            helperText={errors.name && "Nieodpowiedni czas"}
            error={Boolean(errors.name)}
          />
        </FormGroup>
        <FormGroup style={{ marginLeft: "10px" }}>
          <FormLabelStyled>Faza pucharowa (min):</FormLabelStyled>
          <TextFieldStyled
            label="Mecz"
            type="number"
            value={matchesInfo.matchTimeInBracket}
            onChange={handleOnChange}
            disabled={matchesInfo.disabled}
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
            value={matchesInfo.breakTimeInBracket}
            onChange={handleOnChange}
            disabled={matchesInfo.disabled}
            inputProps={{
              name: "breakTimeInBracket",
              ref: register(),
            }}
            helperText={errors.name && "Nieodpowiedni czas"}
            error={Boolean(errors.name)}
          />
        </FormGroup>
      </FormControlStyled>
    </>
  );
};

export default CreateTournamentMatchesInfo;
