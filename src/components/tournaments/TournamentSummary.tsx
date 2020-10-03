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

type Props = {
  tournament: TournamentData;
};

const TournamentSummary: React.FC<Props> = ({ tournament }) => {
  const favorite = true;
  const own = true;

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
        {own ? (
          <IconButtonStarStyled aria-label="star">
            <FavoriteIcon fontSize="small" />
          </IconButtonStarStyled>
        ) : null}
        <IconButtonStarStyled aria-label="star" onClick={handleToggleFavorites}>
          {favorite ? (
            <StarIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </IconButtonStarStyled>
      </TournamentListItemActionSideStyled>
    </TournamentListItemStyled>
  );
};

export default TournamentSummary;
