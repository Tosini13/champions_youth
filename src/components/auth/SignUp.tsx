import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const SignUp = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values: any) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
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

      <TextField
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

      <TextField
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
