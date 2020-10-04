import React, { useState } from "react";
import moment from "moment";
import "moment/locale/pl";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { IconButtonNavStyled } from "../../../styled/styledButtons";
import { DayNavbarContainerStyled } from "../../../styled/styledNav";

const DayNavbar = () => {
  const [date, setDate] = useState(moment().locale("pl"));

  const handleDayBack = () => {
    setDate(moment(date).subtract(1, "day"));
  };

  const handleDayNext = () => {
    setDate(moment(date).add(1, "day"));
  };

  return (
    <div>
      <DayNavbarContainerStyled>
        <IconButtonNavStyled onClick={handleDayBack}>
          <NavigateBeforeIcon fontSize="large" />
        </IconButtonNavStyled>
        <div>{date.fromNow()}</div>
        <IconButtonNavStyled onClick={handleDayNext}>
          <NavigateNextIcon fontSize="large" />
        </IconButtonNavStyled>
      </DayNavbarContainerStyled>
      {/* <DateTimePicker
        clearable
        value={clearedDate}
        onChange={handleDateTimeChange}
        helperText="Clear Initial State"
      /> */}
    </div>
  );
};

export default DayNavbar;
