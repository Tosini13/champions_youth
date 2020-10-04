import React from "react";
import { useLocation } from "react-router-dom";

import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import AdjustIcon from "@material-ui/icons/Adjust";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {
  bottomMenuConst,
  routerConst,
  bottomMenuTitleConst,
  routerConstString,
} from "../../const/menuConst";
import {
  BottomNavigationStyled,
  RedBottomNavigationActionLinkStyled,
  GoldBottomNavigationActionLinkStyled,
} from "../../styled/styledNav";

const BottomNav = () => {
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<{}>, route: string) => {
    // routerState.selectRoute(route as bottomMenuConst);
  };

  return (
    <>
      <BottomNavigationStyled
        value={routerConst.get(location.pathname)}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={GoldBottomNavigationActionLinkStyled}
          to={routerConstString.tournaments}
          label={bottomMenuTitleConst.get(bottomMenuConst.tournaments)}
          value={bottomMenuConst.tournaments}
          icon={<EmojiEventsIcon />}
        />
        <BottomNavigationAction
          component={RedBottomNavigationActionLinkStyled}
          to={routerConstString.live}
          label={bottomMenuTitleConst.get(bottomMenuConst.live)}
          value={bottomMenuConst.live}
          icon={<AdjustIcon />}
        />
        <BottomNavigationAction
          component={RedBottomNavigationActionLinkStyled}
          to={routerConstString.my}
          label={bottomMenuTitleConst.get(bottomMenuConst.my)}
          value={bottomMenuConst.my}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={GoldBottomNavigationActionLinkStyled}
          to={routerConstString.favorites}
          label={bottomMenuTitleConst.get(bottomMenuConst.favorites)}
          value={bottomMenuConst.favorites}
          icon={<StarIcon />}
        />
      </BottomNavigationStyled>
    </>
  );
};

export default BottomNav;
