import React, { useState } from "react";
import moment from "moment";

import "date-fns";
import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  KeyboardDatePickerStyled,
  KeyboardTimePickerStyled,
  TextFieldStyled,
} from "../../../styled/styledForm";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type Props = { register: any; errors: any };

const CreateTournamentBasicInfo: React.FC<Props> = ({ register, errors }) => {
  const [date, setDate] = useState<MaterialUiPickersDate>(moment());
  const [time, setTime] = useState<MaterialUiPickersDate>(moment());

  return (
    <>
      <TextFieldStyled
        label="Title"
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
          value={date}
          onChange={setDate}
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
          value={time}
          onChange={setTime}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default CreateTournamentBasicInfo;
