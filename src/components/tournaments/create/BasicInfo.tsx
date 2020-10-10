import React from "react";

import "date-fns";
import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  KeyboardDatePickerStyled,
  KeyboardTimePickerStyled,
  TextFieldStyled,
} from "../../../styled/styledForm";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { BasicInfoDataForm } from "./CreateTournament";

type Props = {
  register: any;
  errors: any;
  basicInfo: BasicInfoDataForm;
  setBasicInfo: (basicInfo: BasicInfoDataForm) => void;
};

const CreateTournamentBasicInfo: React.FC<Props> = ({
  register,
  errors,
  basicInfo,
  setBasicInfo,
}) => {
  const handleOnChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasicInfo({
      ...basicInfo,
      [element.target.name]: element.target.value,
    });
  };

  const handleOnChangeDate = (value: MaterialUiPickersDate) => {
    setBasicInfo({
      ...basicInfo,
      date: value,
    });
  };

  return (
    <>
      <TextFieldStyled
        label="Title"
        value={basicInfo.name}
        onChange={handleOnChange}
        inputProps={{
          name: "name",
          ref: register({ required: "Required", maxLength: 255, minLength: 2 }),
        }}
        helperText={errors.name && "Title must have at least 2 signs!"}
        error={Boolean(errors.name)}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePickerStyled
          inputProps={{
            name: "date",
            ref: register({}),
          }}
          margin="normal"
          label="Wybierz datę"
          format="yyyy-MM-DD"
          value={basicInfo.date}
          onChange={handleOnChangeDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          cancelLabel="anuluj"
        />
        <KeyboardTimePickerStyled
          inputProps={{
            name: "time",
            ref: register({}),
          }}
          margin="normal"
          label="Wybierz czas"
          value={basicInfo.date}
          onChange={handleOnChangeDate}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default CreateTournamentBasicInfo;
