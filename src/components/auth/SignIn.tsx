import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import {
  FormStyled,
  TextFieldContainerStyled,
  TextFieldStyled,
} from "../../styled/styledForm";
import { Credentials } from "../../models/credentialsData";
import { signIn } from "../../store/actions/AuthActions";

type Props = {
  signIn: (credentials: Credentials) => void;
};

const SignIn: React.FC<Props> = ({ signIn }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values: any) => {
    const user: Credentials = {
      email: values.email,
      password: values.password,
    };
    signIn(user);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TextFieldContainerStyled>
        <TextFieldStyled
          label="Email"
          color="secondary"
          inputProps={{
            name: "email",
            ref: register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }),
          }}
          helperText={errors.email && "Nie prawidłowy adres email"}
          error={Boolean(errors.email)}
        />
        <p>{errors.email && errors.email.message}</p>
      </TextFieldContainerStyled>
      <TextFieldContainerStyled>
        <TextFieldStyled
          label="Hasło"
          color="secondary"
          inputProps={{
            name: "password",
            type: "password",
            ref: register({
              required: "Required",
            }),
          }}
          helperText={errors.password && "Nie prawidłowe hasło"}
          error={Boolean(errors.password)}
        />
        <p>{errors.password && errors.password.message}</p>
      </TextFieldContainerStyled>
      <Button variant="outlined" color="secondary" type="submit">
        Zaloguj
      </Button>
    </FormStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (credentials: Credentials) => dispatch(signIn(credentials)),
  };
};
export default connect(null, mapDispatchToProps)(SignIn);
