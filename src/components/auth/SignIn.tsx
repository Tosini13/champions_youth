import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import Button from "@material-ui/core/Button";
import {
  FormStyled,
  TextFieldContainerStyled,
  TextFieldStyled,
  ErrorTextContainerStyled,
} from "../../styled/styledForm";
import { Credentials } from "../../models/credentialsData";
import { signIn } from "../../store/actions/AuthActions";
import { Redirect } from "react-router-dom";
import { routerConstString } from "../../const/menuConst";

type Props = {
  authError: boolean;
  loggedIn: boolean;
  signIn: (credentials: Credentials) => void;
};

const SignIn: React.FC<Props> = ({ signIn, authError, loggedIn }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values: any) => {
    const user: Credentials = {
      email: values.email,
      password: values.password,
    };
    signIn(user);
  };

  if (loggedIn) return <Redirect to={routerConstString.tournaments} />;
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
      </TextFieldContainerStyled>
      <Button variant="outlined" color="secondary" type="submit">
        Zaloguj
      </Button>
      {authError ? (
        <ErrorTextContainerStyled>
          Login lub hasło są nie prawidłowe
        </ErrorTextContainerStyled>
      ) : null}
    </FormStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state, ownProps);
  const authError = Boolean(state.auth.authError);
  const loggedIn = Boolean(state.firebase.auth.uid);
  console.log(authError);
  return {
    authError,
    loggedIn,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (credentials: Credentials) => dispatch(signIn(credentials)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
