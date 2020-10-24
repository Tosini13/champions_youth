import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
import { routerConstString } from "../../const/menuConst";
import {
  TournamentLinkItemStyled,
  TournamentListItemTitleStyled,
  TournamentListItemDateStyled,
  TournamentListItemStyled,
  TournamentListItemActionSideStyled,
} from "../../styled/styledTournament";

import { IconButtonStarStyled } from "../../styled/styledButtons";
import { TournamentData } from "../../models/tournamentData";
import { Id } from "../../const/structuresConst";
import { setFavorites } from "../../store/actions/UserActions";
import { UserData } from "../../models/credentialsData";
import { ImgStyled } from "../../styled/styledLayout";

type Props = {
  user?: UserData;
  tournament: TournamentData;
  setFavorites: (userId: Id, favoriteTournaments: Id[]) => void;
};

const TournamentSummary: React.FC<Props> = ({
  tournament,
  user,
  setFavorites,
}) => {
  const favorite = user?.favoriteTournaments?.includes(tournament.id);

  const handleToggleFavorites = () => {
    if (user) {
      let favorites: Id[] = [];
      if (favorite && user?.favoriteTournaments) {
        favorites = user?.favoriteTournaments.filter(
          (tournamentId) => tournamentId !== tournament.id
        );
      } else {
        favorites = user?.favoriteTournaments
          ? [...user.favoriteTournaments, tournament.id]
          : [tournament.id];
      }
      setFavorites(user.id, favorites);
    }
  };

  return (
    <TournamentListItemStyled button>
      <TournamentLinkItemStyled
        to={`${routerConstString.tournament}/${tournament.id}`}
      >
        <ImgStyled src={trophy} alt="logo" />
        <TournamentListItemTitleStyled>
          {tournament.name}
        </TournamentListItemTitleStyled>
      </TournamentLinkItemStyled>
      <TournamentListItemActionSideStyled>
        <TournamentListItemDateStyled>
          {moment(tournament.date).format("HH:mm")}
        </TournamentListItemDateStyled>
        {tournament.owner === user?.id ? (
          <IconButtonStarStyled aria-label="star">
            <FavoriteIcon fontSize="small" color="secondary" />
          </IconButtonStarStyled>
        ) : null}
        <IconButtonStarStyled aria-label="star" onClick={handleToggleFavorites}>
          {favorite ? (
            <StarIcon fontSize="small" color="secondary" />
          ) : (
            <StarBorderIcon fontSize="small" color="secondary" />
          )}
        </IconButtonStarStyled>
      </TournamentListItemActionSideStyled>
    </TournamentListItemStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFavorites: (userId: Id, favoriteTournaments: Id[]) =>
      dispatch(setFavorites(userId, favoriteTournaments)),
  };
};
export default connect(null, mapDispatchToProps)(TournamentSummary);
