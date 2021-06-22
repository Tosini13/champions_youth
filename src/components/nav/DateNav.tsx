import React from "react";
import { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import DayNavbar from "./TopNav.tsx/DayNavbar";
import { Grid, Hidden } from "@material-ui/core";
import menuDict from "../../locale/menu";
import {
  CalendarPicker,
  Hamburger,
  IconButtonNav,
} from "../../styled/styledComponents/navigation/styledButtons";
import styled from "styled-components";
import { useLocale } from "../../Provider/LocaleProvider";

const NavSideGrid = styled(Grid)`
  min-width: 50px;
`;
const NavMainGrid = styled(Grid)`
  flex-grow: 1;
`;

export interface DateNavProps {
  isDateActive: boolean;
  isHamburgerOpen?: boolean;
  selectedDate: Moment;
  handleDateChange: (date: MaterialUiPickersDate) => void;
  setSelectedDate: (date: Moment) => void;
  goBack?: () => void;
  toggleHamnburgerOpen?: () => void;
}

const DateNav: React.FC<DateNavProps> = ({
  isDateActive,
  isHamburgerOpen,
  selectedDate,
  handleDateChange,
  setSelectedDate,
  goBack,
  toggleHamnburgerOpen,
}) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        {!isDateActive ? (
          <NavSideGrid item xs={1}>
            <IconButtonNav onClick={goBack}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButtonNav>
          </NavSideGrid>
        ) : (
          <NavSideGrid item xs={1}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CalendarPicker
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
          </NavSideGrid>
        )}
        <NavMainGrid item>
          <DayNavbar
            isDateActive={isDateActive}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </NavMainGrid>
        {isHamburgerOpen !== undefined && toggleHamnburgerOpen ? (
          <NavSideGrid item xs={1}>
            <Hidden smUp>
              <Hamburger
                open={isHamburgerOpen}
                toggleOpen={toggleHamnburgerOpen}
              />
            </Hidden>
          </NavSideGrid>
        ) : null}
      </>
    </Rosetta>
  );
};

export default DateNav;
