import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import moment, { Moment } from "moment";
import "moment/locale/pl";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import {
  IconButtonArrowBeforeStyled,
  IconButtonArrowNextStyled,
} from "../../../styled/styledButtons";
import { DayNameStyled, DayDateStyled } from "../../../styled/styledNav";
import { DATE_FORMAT_SHOW } from "../../../const/menuConst";
import { connect } from "react-redux";
import { LOCALE } from "../../../locale/config";
import menuDict from "../../../locale/menu";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

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
    setSelectedDate(moment(date).subtract(1, "day"));
  };

  const handleDayNext = () => {
    setSelectedDate(moment(date).add(1, "day"));
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
      <GridContainer
        container
        justify="space-between"
        spacing={4}
        wrap="nowrap"
      >
        <Grid item>
          <IconButtonArrowBeforeStyled
            active={isDateActive ? 1 : 0}
            onClick={handleDayBack}
          >
            <NavigateBeforeIcon fontSize="large" />
          </IconButtonArrowBeforeStyled>
        </Grid>
        <Grid item>
          <DayNameStyled color="secondary">{showNameDay(date)}</DayNameStyled>
          <DayDateStyled color="secondary">
            {date.format(DATE_FORMAT_SHOW)}
          </DayDateStyled>
        </Grid>
        <Grid item>
          <IconButtonArrowNextStyled
            active={isDateActive ? 1 : 0}
            onClick={handleDayNext}
          >
            <NavigateNextIcon fontSize="large" />
          </IconButtonArrowNextStyled>
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
