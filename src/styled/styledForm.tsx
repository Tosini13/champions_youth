import React from "react";
import styled from "styled-components";

import { Checkbox, Select, SelectProps } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import FormLabel, { FormLabelTypeMap } from "@material-ui/core/FormLabel";
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
      border-color: blue;
    };
  };
  label {
    color: ${mainTheme.palette.secondary.dark};
  };
  .MuiInput-underline:before{
    border-color: ${mainTheme.palette.secondary.dark};;
  };
`;

/* ---------------------------------------- */
/* TextField */
/* ---------------------------------------- */
export const TemplateTextFieldStyled = styled(TextField)`
  ${INPUT_STYLE};
  max-width: 250px;
`;

export const TextFieldStyled = (props: TextFieldProps) => (
  <TemplateTextFieldStyled color="secondary" {...props} />
);

/* ---------------------------------------- */
/* Select */
/* ---------------------------------------- */

export const TemplateSelectStyled = styled(Select)`
  ${INPUT_STYLE};
  max-width: 250px;
  margin-right: auto;
  color: ${mainTheme.palette.secondary.main};
  svg {
    fill: ${mainTheme.palette.secondary.main};
  }
  &.MuiInput-underline:before {
    border-color: ${mainTheme.palette.secondary.dark};
  }
`;

export const SelectStyled: React.FC<SelectProps> = ({ children, ...props }) => (
  <TemplateSelectStyled color="secondary" {...props}>
    {children}
  </TemplateSelectStyled>
);
/* ---------------------------------------- */
/* KeyboardDatePicker */
/* ---------------------------------------- */
const KEYBOARD_PICKER_STYLE = `
  button{
    color: ${mainTheme.palette.secondary.main};
  }
  ${INPUT_STYLE};
`;

export const TemplateKeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  ${KEYBOARD_PICKER_STYLE};
`;

export const KeyboardDatePickerStyled = (props: KeyboardDatePickerProps) => (
  <TemplateKeyboardDatePickerStyled color="secondary" {...props} />
);
export const TemplateKeyboardTimePickerStyled = styled(KeyboardTimePicker)`
  ${KEYBOARD_PICKER_STYLE};
`;

/* ---------------------------------------- */
/* KeyboardTimePicker */
/* ---------------------------------------- */
export const KeyboardTimePickerStyled = (props: KeyboardTimePickerProps) => (
  <TemplateKeyboardTimePickerStyled color="secondary" {...props} />
);
export const CheckboxStyled = styled(Checkbox)`
  svg {
    color: ${mainTheme.palette.secondary.dark};
  }
`;

/* ---------------------------------------- */
/* FormLabel */
/* ---------------------------------------- */

export const FormControlStyled = styled(FormControl)`
  display: flex;
  flex-direction: row;
`;

export const FormControlLabelStyled = styled(FormControlLabel)`
  color: ${mainTheme.palette.secondary.dark};
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
