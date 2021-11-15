import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from "@material-ui/pickers";
import React from "react";
import { Controller, Control, ValidationRules } from "react-hook-form";

type TControlledDateTimePickerProps = Omit<
  KeyboardDateTimePickerProps,
  "name" | "onChange" | "value"
> & {
  control: Control<any>;
  name: string;
  rules?: ValidationRules;
};

const ControlledDateTimePicker: React.FC<TControlledDateTimePickerProps> = ({
  control,
  name,
  rules,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <KeyboardDateTimePicker
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
    />
  );
};

export default ControlledDateTimePicker;
