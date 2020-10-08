import styled from "styled-components";

import TextField from "@material-ui/core/TextField";

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

export const TextFieldStyled = styled(TextField)`
  input {
    color: ${mainTheme.palette.secondary.main};
    &::before {
      border-color: ${mainTheme.palette.secondary.dark};
    }
  }
  label {
    color: ${mainTheme.palette.secondary.dark};
  }
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
