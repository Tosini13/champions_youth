import React from "react";
import styled from "styled-components";

import {
  Checkbox,
  FormLabel,
  FormLabelProps,
  Select,
  SelectProps,
  TextField,
  useTheme,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { TextFieldProps } from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Stepper from "@material-ui/core/Stepper";

import { mainTheme } from "../styledConst";
import { useColors } from "../themes/CustomThemeProvider";
import { parseStyledBoolean } from "../../helpers/booleanParser";

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

/* ---------------------------------------- */
/* TextField */
/* ---------------------------------------- */
export const TextFieldStyled = styled(TextField)<{
  buttoncolor: string;
  isrequired?: string;
}>`
  //**************
  width: 100%;
  input {
    color: ${(props) => props.theme.palette.text.primary};
    &::before {
      border-color: blue;
    }
  }
  label {
    color: ${(props) => props.theme.palette.secondary.main};
    ${(props) => (props.isrequired ? `&::after { content: " *"; }` : "")}
  }
  .MuiInput-underline:before {
    border-color: ${(props) => props.buttoncolor};
  }
  //**************
  max-width: 250px;
`;

type TextFieldRCProps = any & {
  isRequired?: boolean;
};

export const TextFieldRC = ({ isRequired, ...props }: TextFieldRCProps) => {
  const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <TextFieldStyled
      color="secondary"
      theme={theme}
      buttoncolor={buttonColor}
      isrequired={parseStyledBoolean(isRequired)}
      {...props}
    />
  );
};

export const GroupNameTextFieldRCStyled = styled(TextFieldRC)`
  input {
    text-align: center;
  }
`;
export const GroupNameTextFieldRC = (props: TextFieldProps) => {
  return <GroupNameTextFieldRCStyled {...props} />;
};

/* ---------------------------------------- */
/* FormLabel */
/* ---------------------------------------- */

const FormLabelStyled = styled(FormLabel)`
  color: ${(props) => props.theme.palette.text.primary};
`;

export const FormLabelRC: React.FC<FormLabelProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <FormLabelStyled {...props} theme={theme}>
      {children}
    </FormLabelStyled>
  );
};
/* ---------------------------------------- */
/* Select */
/* ---------------------------------------- */

export const TemplateSelectStyled = styled(Select)<{
  buttoncolor: string;
}>`
  //**************
  width: 100%;
  .MuiInputBase-input {
    color: ${(props) => props.theme.palette.text.primary};
  }
  input {
    color: ${(props) => props.theme.palette.text.primary};
    &::before {
      border-color: blue;
    }
  }
  label {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .MuiInput-underline:before {
    border-color: ${(props) => props.buttoncolor};
  }
  //**************
  max-width: 250px;
  margin-right: auto;
  svg {
    fill: ${(props) => props.theme.palette.text.primary};
  }
  &.MuiInput-underline:before {
    border-color: ${(props) => props.theme.palette.text.primary};
  }
`;

export const SelectRU: React.FC<SelectProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <TemplateSelectStyled
      color="secondary"
      theme={theme}
      buttoncolor={buttonColor}
      {...props}
    >
      {children}
    </TemplateSelectStyled>
  );
};
/* ---------------------------------------- */
/* KeyboardDatePicker */
/* ---------------------------------------- */

export const TemplateKeyboardDatePickerStyled = styled(KeyboardDatePicker)<{
  buttoncolor: string;
}>`
  button {
    color: ${(props) => props.theme.palette.text.primary};
  }
  //**************
  width: 100%;
  input {
    color: ${(props) => props.theme.palette.text.primary};
    &::before {
      border-color: blue;
    }
  }
  label {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .MuiInput-underline:before {
    border-color: ${(props) => props.buttoncolor};
  }
  //**************
`;

export const KeyboardDatePickerStyled = (props: KeyboardDatePickerProps) => {
  const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <TemplateKeyboardDatePickerStyled
      theme={theme}
      buttoncolor={buttonColor}
      color="secondary"
      {...props}
    />
  );
};

/* ---------------------------------------- */
/* KeyboardTimePicker */
/* ---------------------------------------- */
export const TemplateKeyboardTimePickerStyled = styled(KeyboardTimePicker)<{
  buttoncolor: string;
}>`
  button {
    color: ${(props) => props.theme.palette.text.primary};
  }
  //**************
  width: 100%;
  input {
    color: ${(props) => props.theme.palette.text.primary};
    &::before {
      border-color: blue;
    }
  }
  label {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .MuiInput-underline:before {
    border-color: ${(props) => props.buttoncolor};
  }
  //**************
`;

export const KeyboardTimePickerStyled = (props: KeyboardTimePickerProps) => {
  const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <TemplateKeyboardTimePickerStyled
      theme={theme}
      buttoncolor={buttonColor}
      color="secondary"
      {...props}
    />
  );
};

/* ---------------------------------------- */
/* Checkbox */
/* ---------------------------------------- */
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

export const AddTeamTextFieldStyled = styled(TextFieldRC)`
  flex-grow: 1;
`;

export const EditTeamInputStyled = styled(TextFieldRC)`
  input {
    font-size: 0.8rem;
  }
`;

export const ErrorTextContainerStyled = styled.p`
  color: ${mainTheme.palette.error.main};
`;
