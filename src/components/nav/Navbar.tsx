import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Moment } from "moment";
import { useHistory } from "react-router-dom";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import "date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Grid, Hidden } from "@material-ui/core";

import { GridNavBarStyled, NavContainerStyled } from "../../styled/styledNav";
import { HamburgerStyled } from "../../styled/styledIcons";
import MenuSideBar from "./mainMenu/MenuSideBar";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { IconButtonNavStyled } from "../../styled/styledButtons";
import { routerConstString } from "../../const/menuConst";
import DateNav from "./DateNav";
import { LOCALE } from "../../locale/config";

const Navbar = ({
  locale,
  selectedDate,
  setSelectedDate,
}: {
  locale: LOCALE;
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
          <GridNavBarStyled
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            {!isDateActive ? (
              <Grid item>
                <IconButtonNavStyled onClick={goBack}>
                  <NavigateBeforeIcon fontSize="large" />
                </IconButtonNavStyled>
              </Grid>
            ) : null}
            <DateNav
              locale={locale}
              isDateActive={isDateActive}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              setSelectedDate={setSelectedDate}
            />
            <Grid item>
              <Hidden smUp>
                <HamburgerStyled
                  open={sideBarMenuOpened}
                  onClick={toggleSideBarMenu}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </HamburgerStyled>
              </Hidden>
            </Grid>
          </GridNavBarStyled>
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
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSelectedDate: (selectedDate: Moment) =>
      dispatch(setSelectedDate(selectedDate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
