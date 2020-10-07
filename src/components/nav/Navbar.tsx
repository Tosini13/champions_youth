import React, { useState } from "react";
import { connect } from "react-redux";

import {
  NavBarStyled,
  NavContainerStyled,
  KeyboardDatePickerStyled,
} from "../../styled/styledNav";
import { HamburgerStyled } from "../../styled/styledIcons";
import DayNavbar from "./TopNav.tsx/DayNavbar";
import MenuSideBar from "./mainMenu/MenuSideBar";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Moment } from "moment";

const Navbar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Moment;
  setSelectedDate: (menu: Moment) => void;
}) => {
  const [sideBarMenuOpened, setSideBarMenu] = useState(false);

  const toggleSideBarMenu = () => {
    setSideBarMenu(!sideBarMenuOpened);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <>
      <NavContainerStyled>
        <NavBarStyled>
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
          <DayNavbar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <HamburgerStyled open={sideBarMenuOpened} onClick={toggleSideBarMenu}>
            <div></div>
            <div></div>
            <div></div>
          </HamburgerStyled>
        </NavBarStyled>
      </NavContainerStyled>
      <MenuSideBar
        sideBarMenuOpened={sideBarMenuOpened}
        toggleSideBarMenu={toggleSideBarMenu}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    selectedDate: state.menu.selectedDate,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedDate: (selectedDate: Moment) =>
      dispatch(setSelectedDate(selectedDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
