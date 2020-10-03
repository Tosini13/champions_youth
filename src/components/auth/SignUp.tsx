import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";

import { FormStyled, TextFieldContainerStyled, TextFieldStyled } from "../../styled/styledForm";
import { signUp } from "../../store/actions/AuthActions";
import { Credentials, User } from "../../models/credentialsData";

type Props = {
  signUp: (credentials: Credentials, user: User) => void;
};

const SignUp: React.FC<Props> = ({ signUp }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values: any) => {
    const credentials: Credentials = {
      email: values.email,
      password: values.password,
    };
    const user: User = {
      login: values.login,
    };
    signUp(credentials, user);
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TextFieldContainerStyled>
        <TextFieldStyled
          label="Login"
          color="secondary"
          inputProps={{
            name: "login",
            ref: register({
              required: "Required",
            }),
          }}
          helperText={errors.login && "Nie prawidłowy login"}
          error={Boolean(errors.login)}
        />
        {errors.email && errors.email.message}
      </TextFieldContainerStyled>
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
        {errors.email && errors.email.message}
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
        {errors.password && errors.password.message}
      </TextFieldContainerStyled>
      <TextFieldContainerStyled>
        <TextFieldStyled
          label="Powtórz hasło"
          color="secondary"
          inputProps={{
            name: "passwordRepeat",
            type: "password",
            ref: register({
              required: "Required",
            }),
          }}
          helperText={errors.passwordRepeat && "Nie prawidłowe hasło"}
          error={Boolean(errors.passwordRepeat)}
        />
        {errors.passwordRepeat && errors.passwordRepeat.message}
      </TextFieldContainerStyled>
      <Button variant="outlined" color="secondary" type="submit">
        Zarejestruj
      </Button>
    </FormStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (credentials: Credentials, user: User) =>
      dispatch(signUp(credentials, user)),
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
