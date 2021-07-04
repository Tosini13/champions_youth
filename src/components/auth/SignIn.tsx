import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import {
  TextFieldContainerStyled,
  TextFieldRC,
  ErrorTextContainerStyled,
} from "../../styled/styledComponents/styledForm";
import { Credentials } from "../../models/credentialsData";
import { signIn } from "../../store/actions/AuthActions";
import { routerConstString } from "../../const/menuConst";
import { ButtonRC, LinkRC } from "../../styled/styledComponents/styledButtons";
import { FormAuthStyled } from "../../styled/styledComponents/auth/styledForm";
import authDict, { authDictLocale } from "../../locale/auth.dict";
import { useLocale } from "../../Provider/LocaleProvider";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import { Grid } from "@material-ui/core";
import Logo, { SIZE_LOGO } from "../global/Logo";

type Props = {
  authError: boolean;
  loggedIn: boolean;
  signIn: (credentials: Credentials) => void;
};

const SignIn: React.FC<Props> = ({ signIn, authError, loggedIn }) => {
  const { locale } = useLocale();
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
    <Rosetta translations={authDict} locale={locale}>
      <FormAuthStyled onSubmit={handleSubmit(onSubmit)}>
        <Logo size={SIZE_LOGO.lg} />
        <TextFieldContainerStyled>
          <TextFieldRC
            label={<Translator id="email" />}
            color="secondary"
            inputProps={{
              name: "email",
              ref: register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: authDictLocale(locale).invalidEmail,
                },
              }),
            }}
            helperText={errors.email && <Translator id="wrongEmail" />}
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
                required: "Required",
              }),
            }}
            helperText={errors.password && <Translator id="wrongPassword" />}
            error={Boolean(errors.password)}
          />
        </TextFieldContainerStyled>
        <ButtonRC type="submit">
          <Translator id="logIn" />
        </ButtonRC>
        <Grid
          container
          direction="column"
          spacing={2}
          justify="center"
          style={{ marginTop: "20px" }}
        >
          <Grid item>
            <TypographyPrimaryText align="center">
              <LinkRC to={routerConstString.signUp}>
                <Translator id="noAccountYet" />
              </LinkRC>
            </TypographyPrimaryText>
          </Grid>
          {/* <Grid item>
            <TypographyPrimaryText align="center">
              <ARC>
                <Translator id="forgotPassword" />
              </ARC>
            </TypographyPrimaryText>
          </Grid> */}
        </Grid>
        {authError ? (
          <ErrorTextContainerStyled>
            <Translator id="logInOrPasswordWrong" />
          </ErrorTextContainerStyled>
        ) : null}
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
    signIn: (credentials: Credentials) => dispatch(signIn(credentials)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
