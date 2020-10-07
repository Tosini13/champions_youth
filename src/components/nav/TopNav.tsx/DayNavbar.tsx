import React from "react";
import moment, { Moment } from "moment";
import "moment/locale/pl";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { IconButtonNavStyled } from "../../../styled/styledButtons";
import {
  DayNavbarContainerStyled,
  DayNameStyled,
  DayDateStyled,
} from "../../../styled/styledNav";
import { DATE_FORMAT_SHOW } from "../../../const/menuConst";

const DayNavbar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Moment;
  setSelectedDate: (date: Moment) => void;
}) => {
  const handleDayBack = () => {
    setSelectedDate(moment(date).subtract(1, "day"));
  };

  const handleDayNext = () => {
    setSelectedDate(moment(date).add(1, "day"));
  };

  const showNameDay = (date: Moment) => {
    if (moment().isSame(date, "day")) return "dzisiaj";
    if (moment().add(1, "day").isSame(date, "day")) return "jutro";
    if (moment(date).subtract(1, "day").isSame(date, "day")) return "wczoraj";
    return date.format("dddd");
  };

  const date = moment(selectedDate).locale("pl");
  return (
    <DayNavbarContainerStyled>
      <IconButtonNavStyled onClick={handleDayBack}>
        <NavigateBeforeIcon fontSize="large" />
      </IconButtonNavStyled>
      <div>
        <DayNameStyled>{showNameDay(date)}</DayNameStyled>
        <DayDateStyled>{date.format(DATE_FORMAT_SHOW)}</DayDateStyled>
      </div>
      <IconButtonNavStyled onClick={handleDayNext}>
        <NavigateNextIcon fontSize="large" />
      </IconButtonNavStyled>
    </DayNavbarContainerStyled>
  );
};

export default DayNavbar;
