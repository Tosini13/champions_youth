import React from "react";
import { useLocation } from "react-router-dom";
import { Rosetta, Translator } from "react-rosetta";

import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import AdjustIcon from "@material-ui/icons/Adjust";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {
  bottomMenuConst,
  routerConst,
  routerConstString,
} from "../../const/menuConst";
import {
  BottomNavigationStyled,
  RedBottomNavigationActionLinkStyled,
  GoldBottomNavigationActionLinkStyled,
} from "../../styled/styledNav";
import menuDict from "../../locale/menu";
import { connect } from "react-redux";
import { LOCALE } from "../../locale/config";

type Props = {
  locale: LOCALE;
};

const BottomNav: React.FC<Props> = ({ locale }) => {
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<{}>, route: string) => {
    // routerState.selectRoute(route as bottomMenuConst);
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        <BottomNavigationStyled
          value={routerConst.get(location.pathname)}
          onChange={handleChange}
        >
          <BottomNavigationAction
            component={GoldBottomNavigationActionLinkStyled}
            to={routerConstString.tournaments}
            label={<Translator id={bottomMenuConst.tournaments} />}
            value={bottomMenuConst.tournaments}
            icon={<EmojiEventsIcon />}
          />
          <BottomNavigationAction
            component={RedBottomNavigationActionLinkStyled}
            to={routerConstString.live}
            label={<Translator id={bottomMenuConst.live} />}
            value={bottomMenuConst.live}
            icon={<AdjustIcon />}
          />
          <BottomNavigationAction
            component={RedBottomNavigationActionLinkStyled}
            to={routerConstString.my}
            label={<Translator id={bottomMenuConst.my} />}
            value={bottomMenuConst.my}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={GoldBottomNavigationActionLinkStyled}
            to={routerConstString.favorites}
            label={<Translator id={bottomMenuConst.favorites} />}
            value={bottomMenuConst.favorites}
            icon={<StarIcon />}
          />
        </BottomNavigationStyled>
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(BottomNav);
