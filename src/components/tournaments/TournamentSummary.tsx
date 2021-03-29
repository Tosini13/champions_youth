import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
import { getImage, getImageJustUploaded } from "./actions/getImage";
import Logo, { SIZE_LOGO } from "../global/Logo";

type Props = {
  user?: UserData;
  tournament: TournamentData;
  setFavorites: (userId: Id, favoriteTournaments: Id[]) => void;
  authorId: Id;
};

const TournamentSummary: React.FC<Props> = ({
  tournament,
  user,
  setFavorites,
  authorId,
}) => {
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (tournament?.image && authorId) {
      console.log(tournament.id);
      getImage(tournament.image, tournament.id)
        .then((image) => {
          let img = image;
          if (!image && tournament.image) {
            img = getImageJustUploaded(tournament.image, authorId) ?? undefined;
          }
          setImage(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [tournament, authorId]);

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
        <Logo src={image} size={SIZE_LOGO.lg} />
        <TournamentListItemTitleStyled>
          {tournament.name}
        </TournamentListItemTitleStyled>
      </TournamentLinkItemStyled>
      <TournamentListItemActionSideStyled>
        <TournamentListItemDateStyled>
          {moment(tournament.date).format("HH:mm")}
        </TournamentListItemDateStyled>
        {tournament.ownerId === user?.id ? (
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

const mapStateToProps = (state: any, ownProps: any) => {
  const authorId = state.firebase.auth.uid;
  return {
    authorId,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFavorites: (userId: Id, favoriteTournaments: Id[]) =>
      dispatch(setFavorites(userId, favoriteTournaments)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentSummary);
