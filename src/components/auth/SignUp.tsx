import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import {
  TextFieldContainerStyled,
  TextFieldRC,
} from "../../styled/styledComponents/styledForm";
import { signUp } from "../../store/actions/AuthActions";
import { Credentials, User } from "../../models/credentialsData";
import { routerConstString } from "../../const/menuConst";
import { ButtonRC, LinkRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";
import authDict, { authDictLocale } from "../../locale/auth.dict";
import { FormAuthStyled } from "../../styled/styledComponents/auth/styledForm";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import Logo, { SIZE_LOGO } from "../global/Logo";

type Props = {
  signUp: (credentials: Credentials, user: User) => void;
  authError: boolean;
  loggedIn: boolean;
};

const SignUp: React.FC<Props> = ({ signUp, authError, loggedIn }) => {
  const { locale } = useLocale();
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
    <Rosetta translations={authDict} locale={locale}>
      <FormAuthStyled onSubmit={handleSubmit(onSubmit)}>
        <Logo size={SIZE_LOGO.lg} />
        <TextFieldContainerStyled>
          <TextFieldRC
            label={<Translator id="login" />}
            color="secondary"
            inputProps={{
              name: "login",
              ref: register({
                required: authDictLocale(locale).required,
              }),
            }}
            helperText={errors.login && <Translator id="invalidLogin" />}
            error={Boolean(errors.login)}
          />
        </TextFieldContainerStyled>
        <TextFieldContainerStyled>
          <TextFieldRC
            label={<Translator id="email" />}
            color="secondary"
            inputProps={{
              name: "email",
              ref: register({
                required: authDictLocale(locale).required,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              }),
            }}
            helperText={errors.email && <Translator id="invalidEmail" />}
            error={Boolean(errors.email)}
          />
        </TextFieldContainerStyled>
        <TextFieldContainerStyled>
          <TextFieldRC
            label={<Translator id="password" />}
            color="secondary"
            inputProps={{
              name: "password",
              type: "password",
              ref: register({
                required: authDictLocale(locale).required,
              }),
            }}
            helperText={errors.password && <Translator id="invalidEmail" />}
            error={Boolean(errors.password)}
          />
        </TextFieldContainerStyled>
        <TextFieldContainerStyled>
          <TextFieldRC
            label={<Translator id="repeatPassword" />}
            color="secondary"
            inputProps={{
              name: "passwordRepeat",
              type: "password",
              ref: register({
                required: authDictLocale(locale).required,
                validate: (value) => value === watch("password"),
              }),
            }}
            helperText={
              errors.passwordRepeat && (
                <Translator id="invalidRepeatedPassword" />
              )
            }
            error={Boolean(errors.passwordRepeat)}
          />
        </TextFieldContainerStyled>
        <ButtonRC type="submit">
          <Translator id="signUp" />
        </ButtonRC>
        <TypographyPrimaryText align="center" style={{ marginTop: "20px" }}>
          <LinkRC to={routerConstString.login}>
            <Translator id="goTologInPage" />
          </LinkRC>
        </TypographyPrimaryText>
      </FormAuthStyled>
    </Rosetta>
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
