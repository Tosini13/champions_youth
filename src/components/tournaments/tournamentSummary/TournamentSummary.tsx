import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { routerConstString } from "../../../const/menuConst";

import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import { setFavorites } from "../../../store/actions/UserActions";
import { UserData } from "../../../models/credentialsData";
import { getImage, getImageJustUploaded } from "../actions/getImage";
import TournamentSummaryActions from "./TournamentSummaryActions";
import { Link } from "react-router-dom";
import TournamentSummaryContent from "./TournamentSummaryContent";
import styled from "styled-components";
import { TournamentLogoContainer } from "../../../styled/styledComponents/tournament/styledLayout";
import Logo, { SIZE_LOGO } from "../../global/Logo";

const LinkStyled = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
  margin: 0px 20px;
  margin-left: 50px;
`;

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
    <div style={{ position: "relative", padding: "15px 0px" }}>
      <TournamentLogoContainer>
        <Logo src={image} size={SIZE_LOGO.lg} />
      </TournamentLogoContainer>
      <LinkStyled to={`${routerConstString.tournament}/${tournament.id}`}>
        <TournamentSummaryContent
          name={tournament.name}
          sponsor={"Gaz Prom"}
          date={tournament.date}
          location={tournament.city}
        />
      </LinkStyled>
      <TournamentSummaryActions
        isMy={tournament.ownerId === user?.id}
        isFavorite={favorite ?? false}
        handleToggleFavorites={handleToggleFavorites}
      />
    </div>
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
