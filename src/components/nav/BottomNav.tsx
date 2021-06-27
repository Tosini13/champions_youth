import React from "react";
import { useLocation } from "react-router-dom";
import { Rosetta, Translator } from "react-rosetta";

import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
// import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {
  bottomMenuConst,
  routerConst,
  routerConstString,
} from "../../const/menuConst";
import menuDict from "../../locale/menu";
import {
  BottomNavigationRC,
  NavBottomLink,
  NavBottomLiveLink,
} from "../../styled/styledComponents/navigation/styledLayout";
import { useLocale } from "../../Provider/LocaleProvider";

type Props = {};

const BottomNav: React.FC<Props> = () => {
  const { locale } = useLocale();
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
        {/* <BottomNavigationAction
          component={NavBottomLiveLink}
          to={routerConstString.matches}
          label={<Translator id={bottomMenuConst.matches} />}
          value={bottomMenuConst.matches}
          icon={<SportsSoccerIcon />}
        />
          component={NavBottomLiveLink}
          to={routerConstString.matches}
          label={<Translator id={bottomMenuConst.matches} />}
          value={bottomMenuConst.matches}
          icon={<SportsSoccerIcon />}
        /> */}
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

export default BottomNav;
