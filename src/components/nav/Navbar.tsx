import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Moment } from "moment";
import { useHistory } from "react-router-dom";

import "date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Grid, Hidden } from "@material-ui/core";

import MenuSideBar from "./mainMenu/MenuSideBar";
import { setSelectedDate } from "../../store/actions/MenuActions";
import { routerConstString } from "../../const/menuConst";
import DateNav from "./DateNav";
import { NavContainer } from "../../styled/styledComponents/navigation/styledLayout";

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
        <NavContainer>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <DateNav
              isDateActive={isDateActive}
              selectedDate={selectedDate}
              isHamburgerOpen={sideBarMenuOpened}
              handleDateChange={handleDateChange}
              setSelectedDate={setSelectedDate}
              goBack={goBack}
              toggleHamnburgerOpen={toggleSideBarMenu}
            />
          </Grid>
        </NavContainer>
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
