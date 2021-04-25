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
import menuDict from "../../locale/menu";
import { connect } from "react-redux";
import { LOCALE } from "../../locale/config";
import {
  BottomNavigationRC,
  NavBottomLink,
  NavBottomLiveLink,
} from "../../styled/styledComponents/navigation/styledLayout";

type Props = {
  locale: LOCALE;
};

const BottomNav: React.FC<Props> = ({ locale }) => {
  const location = useLocation();

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <BottomNavigationRC
        value={routerConst.get(location.pathname + location.search)}
      >
        <BottomNavigationAction
          component={NavBottomLink}
          to={routerConstString.tournaments}
          label={<Translator id={bottomMenuConst.tournaments} />}
          value={bottomMenuConst.tournaments}
          icon={<EmojiEventsIcon />}
        />
        <BottomNavigationAction
          component={NavBottomLiveLink}
          to={routerConstString.live}
          label={<Translator id={bottomMenuConst.live} />}
          value={bottomMenuConst.live}
          icon={<AdjustIcon />}
        />
        <BottomNavigationAction
          component={NavBottomLiveLink}
          to={routerConstString.my}
          label={<Translator id={bottomMenuConst.my} />}
          value={bottomMenuConst.my}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          component={NavBottomLink}
          to={routerConstString.favorites}
          label={<Translator id={bottomMenuConst.favorites} />}
          value={bottomMenuConst.favorites}
          icon={<StarIcon />}
        />
      </BottomNavigationRC>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(BottomNav);
