import React from "react";
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
  TournamentListItemImgStyled,
  TournamentListItemStyled,
  TournamentListItemActionSideStyled,
} from "../../styled/styledTournament";

import { IconButtonStarStyled } from "../../styled/styledButtons";
import { TournamentData } from "../../models/tournamentData";
import { Id } from "../../const/structuresConst";

type Props = {
  userId?: Id;
  tournament: TournamentData;
};

const TournamentSummary: React.FC<Props> = ({ tournament, userId }) => {
  const favorite = false;
  const handleToggleFavorites = () => {};

  return (
    <TournamentListItemStyled button>
      <TournamentLinkItemStyled
        to={`${routerConstString.tournament}/${tournament.id}`}
      >
        <TournamentListItemImgStyled src={trophy} alt="logo" />
        <TournamentListItemTitleStyled>
          {tournament.name}
        </TournamentListItemTitleStyled>
      </TournamentLinkItemStyled>
      <TournamentListItemActionSideStyled>
        <TournamentListItemDateStyled>
          {moment(tournament.date).format("HH:mm")}
        </TournamentListItemDateStyled>
        {tournament.ownerId === userId ? (
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

export default TournamentSummary;
