import React from "react";
import { Control, Controller, ValidationRules } from "react-hook-form";
import { TextFieldProps } from "@material-ui/core";
import { TextFieldRC } from "../../styled/styledComponents/styledForm";
type TControlledTextFieldProps = Omit<TextFieldProps, "name"> & {
  control: Control<any>;
  rules: ValidationRules;
  name: string;
};

const ControlledTextField: React.FC<TControlledTextFieldProps> = ({
  control,
  name,
  rules,
  defaultValue,
  error,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <TextFieldRC
          {...props}
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched/blur
          value={value}
          isRequired={Boolean(rules.required)}
        />
      )}
    />
  );
};

export default ControlledTextField;
