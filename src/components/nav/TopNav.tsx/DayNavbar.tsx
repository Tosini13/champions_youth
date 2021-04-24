import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import moment, { Moment } from "moment";
import "moment/locale/pl";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { DayNameStyled, DayDateStyled } from "../../../styled/styledNav";
import { DATE_FORMAT_SHOW } from "../../../const/menuConst";
import { connect } from "react-redux";
import { LOCALE } from "../../../locale/config";
import menuDict from "../../../locale/menu";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import {
  IconButtonPreviosDay,
  IconButtonNextDay,
} from "../../../styled/styledComponents/navigation/styledButtons";

const GridContainer = styled(Grid)`
  max-width: 250px;
`;

const DayNavbar = ({
  selectedDate,
  setSelectedDate,
  isDateActive,
  locale,
}: {
  selectedDate: Moment;
  setSelectedDate: (date: Moment) => void;
  isDateActive: boolean;
  locale: LOCALE;
}) => {
  const handleDayBack = () => {
    if (isDateActive) setSelectedDate(moment(date).subtract(1, "day"));
  };

  const handleDayNext = () => {
    if (isDateActive) setSelectedDate(moment(date).add(1, "day"));
  };

  const showNameDay = (date: Moment) => {
    if (moment().isSame(date, "day")) return <Translator id="today" />;
    if (moment().add(1, "day").isSame(date, "day"))
      return <Translator id="tomorrow" />;
    if (moment().subtract(1, "day").isSame(date, "day"))
      return <Translator id="yesterday" />;
    return date.format("dddd");
  };

  const date = moment(selectedDate).locale(locale);
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <GridContainer container justify="space-between" wrap="nowrap">
        <Grid item>
          <IconButtonPreviosDay
            active={isDateActive}
            onClick={handleDayBack}
            aria-label="previous-day"
          >
            <NavigateBeforeIcon fontSize="large" />
          </IconButtonPreviosDay>
        </Grid>
        <Grid item>
          <DayNameStyled color="secondary">{showNameDay(date)}</DayNameStyled>
          <DayDateStyled color="secondary">
            {date.format(DATE_FORMAT_SHOW)}
          </DayDateStyled>
        </Grid>
        <Grid item>
          <IconButtonNextDay
            active={isDateActive}
            onClick={handleDayNext}
            aria-label="next-day"
          >
            <NavigateNextIcon fontSize="large" />
          </IconButtonNextDay>
        </Grid>
      </GridContainer>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(DayNavbar);
