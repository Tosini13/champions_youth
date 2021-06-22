import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import {
  FormStyled,
  TextFieldContainerStyled,
  TextFieldRC,
} from "../../styled/styledComponents/styledForm";
import { signUp } from "../../store/actions/AuthActions";
import { Credentials, User } from "../../models/credentialsData";
import { routerConstString } from "../../const/menuConst";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";

type Props = {
  signUp: (credentials: Credentials, user: User) => void;
  authError: boolean;
  loggedIn: boolean;
};

const SignUp: React.FC<Props> = ({ signUp, authError, loggedIn }) => {
  const { handleSubmit, register, errors, watch } = useForm();
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

  if (loggedIn) return <Redirect to={routerConstString.tournaments} />;
  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TextFieldContainerStyled>
        <TextFieldRC
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
      </TextFieldContainerStyled>
      <TextFieldContainerStyled>
        <TextFieldRC
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
        <TextFieldRC
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
      <TextFieldContainerStyled>
        <TextFieldRC
          label="Powtórz hasło"
          color="secondary"
          inputProps={{
            name: "passwordRepeat",
            type: "password",
            ref: register({
              required: "Required",
              validate: (value) => value === watch("password"),
            }),
          }}
          helperText={errors.passwordRepeat && "Źle powtórzone hasło"}
          error={Boolean(errors.passwordRepeat)}
        />
      </TextFieldContainerStyled>
      <ButtonRC type="submit">Zarejestruj</ButtonRC>
    </FormStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const authError = Boolean(state.auth.authError);
  const loggedIn = Boolean(state.firebase.auth.uid);
  return {
    authError,
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (credentials: Credentials, user: User) =>
      dispatch(signUp(credentials, user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
