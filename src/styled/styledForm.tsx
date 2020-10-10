import styled from "styled-components";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Stepper from "@material-ui/core/Stepper";

import { mainTheme } from "./styledConst";

export const FormStyled = styled.form`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TextFieldContainerStyled = styled.div`
  margin-bottom: 20px;
`;

const INPUT_STYLE = `
  width: 100%;
  input {
    color: ${mainTheme.palette.secondary.main};
    &::before {
      border-color: ${mainTheme.palette.secondary.dark};
    }
  };
  label {
    color: ${mainTheme.palette.secondary.dark};
  };
`;

export const TextFieldStyled = styled(TextField)`
  ${INPUT_STYLE};
`;

const KEYBOARD_PICKER_STYLE = `
  button{
    color: ${mainTheme.palette.secondary.main};
  }
  ${INPUT_STYLE};
`;

export const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  ${KEYBOARD_PICKER_STYLE};
`;

export const KeyboardTimePickerStyled = styled(KeyboardTimePicker)`
  ${KEYBOARD_PICKER_STYLE};
`;

export const FormControlStyled = styled(FormControl)`
  display: flex;
  flex-direction: row;
`;

export const FormControlLabelStyled = styled(FormControlLabel)`
  color: ${mainTheme.palette.secondary.dark};
`;

export const FormLabelStyled = styled(FormLabel)`
  color: ${mainTheme.palette.secondary.dark};
  font-size: 15px;
  text-align: center;
`;

export const TournamentCreationStepperStyled = styled(Stepper)`
  background-color: transparent;
  width: 100%;
`;

export const TournamentCreationStepLabelStyled = styled(Button)`
  color: ${mainTheme.palette.secondary.light};
`;

export const AddTeamTextFieldStyled = styled(TextFieldStyled)`
  flex-grow: 1;
`;

export const EditTeamInputStyled = styled(TextFieldStyled)`
  input {
    font-size: 0.8rem;
  }
`;

export const ErrorTextContainerStyled = styled.p`
  color: ${mainTheme.palette.error.main};
`;
