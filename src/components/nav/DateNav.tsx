import React from "react";
import { Moment } from "moment";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { KeyboardDatePickerStyled } from "../../styled/styledNav";
import DayNavbar from "./TopNav.tsx/DayNavbar";
import { Grid } from "@material-ui/core";

export interface DateNavProps {
  isDateActive: boolean;
  selectedDate: Moment;
  handleDateChange: (date: MaterialUiPickersDate) => void;
  setSelectedDate: (date: Moment) => void;
}

const DateNav: React.FC<DateNavProps> = ({
  isDateActive,
  selectedDate,
  handleDateChange,
  setSelectedDate,
}) => {
  return (
    <>
      {isDateActive ? (
        <Grid item xs={1}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePickerStyled
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              cancelLabel="anuluj"
            />
          </MuiPickersUtilsProvider>
        </Grid>
      ) : null}
      <Grid item>
        <DayNavbar
          isDateActive={isDateActive}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Grid>
    </>
  );
};

export default DateNav;
