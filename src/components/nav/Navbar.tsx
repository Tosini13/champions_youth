import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import "date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { NavBarStyled, NavContainerStyled } from "../../styled/styledNav";
import { HamburgerStyled } from "../../styled/styledIcons";
import MenuSideBar from "./mainMenu/MenuSideBar";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { Moment } from "moment";
import { IconButtonNavStyled } from "../../styled/styledButtons";
import { routerConstString } from "../../const/menuConst";
import { Hidden } from "@material-ui/core";
import DateNav from "./DateNav";

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
    return history.listen((location) => {
      setIsDateActive(
        location.pathname + location.search ===
          (routerConstString.tournaments ||
            routerConstString.favorites ||
            routerConstString.live ||
            routerConstString.my)
      );
    });
  }, [history]);

  return (
    <>
      <Hidden mdUp>
        <NavContainerStyled>
          <NavBarStyled>
            {!isDateActive ? (
              <IconButtonNavStyled onClick={goBack}>
                <NavigateBeforeIcon fontSize="large" />
              </IconButtonNavStyled>
            ) : null}
            <DateNav
              isDateActive={isDateActive}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              setSelectedDate={setSelectedDate}
            />
            <HamburgerStyled
              open={sideBarMenuOpened}
              onClick={toggleSideBarMenu}
            >
              <div></div>
              <div></div>
              <div></div>
            </HamburgerStyled>
          </NavBarStyled>
        </NavContainerStyled>
      </Hidden>
      <MenuSideBar
        handleCloseSideBar={() => setSideBarMenu(false)}
        sideBarMenuOpened={sideBarMenuOpened}
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
