import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import {
  NavBarStyled,
  NavContainerStyled,
  KeyboardDatePickerStyled,
} from "../../styled/styledNav";
import { HamburgerStyled } from "../../styled/styledIcons";
import DayNavbar from "./TopNav.tsx/DayNavbar";
import MenuSideBar from "./mainMenu/MenuSideBar";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { Moment } from "moment";
import { IconButtonNavStyled } from "../../styled/styledButtons";
import { routerConstString } from "../../const/menuConst";

const Navbar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Moment;
  setSelectedDate: (menu: Moment) => void;
}) => {
  const history = useHistory();
  const [sideBarMenuOpened, setSideBarMenu] = useState(false);
  const [isDateActive, setIsDateActive] = useState(false);

  const toggleSideBarMenu = () => {
    setSideBarMenu(!sideBarMenuOpened);
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setIsDateActive(
      history.location.pathname ===
        (routerConstString.tournaments ||
          routerConstString.favorites ||
          routerConstString.live ||
          routerConstString.my)
    );
  }, [history.location]);

  return (
    <>
      <NavContainerStyled>
        <NavBarStyled>
          {isDateActive ? (
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
          ) : (
            <IconButtonNavStyled onClick={goBack}>
              <NavigateBeforeIcon fontSize="large" />
            </IconButtonNavStyled>
          )}
          <DayNavbar
            isDateActive={isDateActive}
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
