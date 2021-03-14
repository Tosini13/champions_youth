import React from "react";
import { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { KeyboardDatePickerStyled } from "../../styled/styledNav";
import DayNavbar from "./TopNav.tsx/DayNavbar";
import { Grid } from "@material-ui/core";
import { LOCALE } from "../../locale/config";
import menuDict from "../../locale/menu";

export interface DateNavProps {
  locale: LOCALE;
  isDateActive: boolean;
  selectedDate: Moment;
  handleDateChange: (date: MaterialUiPickersDate) => void;
  setSelectedDate: (date: Moment) => void;
}

const DateNav: React.FC<DateNavProps> = ({
  locale,
  isDateActive,
  selectedDate,
  handleDateChange,
  setSelectedDate,
}) => {
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        {isDateActive ? (
          <Grid item xs={1}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePickerStyled
                margin="normal"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                cancelLabel={<Translator id="cancel" />}
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
    </Rosetta>
  );
};

export default DateNav;
