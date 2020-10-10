import React from "react";
import moment from "moment";

import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlaceIcon from "@material-ui/icons/Place";
import Button from "@material-ui/core/Button";

import trophy from "../../../images/logo/tournament_logo_trophy2.png";
import {
  ALinkStyled,
  MainContainerContentStyled,
  MainContainerStyled,
  TournamentDetailsInfoContentStyled,
  TournamentDetailsInfoStyled,
  TournamentTitle,
} from "../../../styled/styledTournamentInfo";
import { TournamentData } from "../../../models/tournamentData";
import { TournamentListItemImgStyled } from "../../../styled/styledTournament";
import { Id } from "../../../const/structuresConst";
import { deleteTournament } from "../../../store/actions/TournamentActions";
import { connect } from "react-redux";

type Props = {
  tournament: TournamentData;
  deleteTournament: (tournamentId: Id) => void;
};

const TournamentInfo: React.FC<Props> = ({
  tournament,
  deleteTournament,
  children,
}) => {
  return (
    <MainContainerStyled>
      <MainContainerContentStyled>
        <TournamentDetailsInfoStyled>
          <TournamentListItemImgStyled src={trophy} alt="logo" />
          <TournamentTitle>{tournament.name}</TournamentTitle>
        </TournamentDetailsInfoStyled>
        <TournamentDetailsInfoStyled>
          <EventAvailableIcon fontSize="small" />
          <TournamentDetailsInfoContentStyled>
            {moment(tournament.date).format("yyyy MMMM DD")}
          </TournamentDetailsInfoContentStyled>
        </TournamentDetailsInfoStyled>
        <TournamentDetailsInfoStyled>
          <ScheduleIcon fontSize="small" />
          <TournamentDetailsInfoContentStyled>
            {moment(tournament.date).format("HH:mm")}
          </TournamentDetailsInfoContentStyled>
        </TournamentDetailsInfoStyled>
        {tournament.address?.localeCompare("") &&
        tournament.city?.localeCompare("") ? (
          <TournamentDetailsInfoStyled>
            <PlaceIcon fontSize="small" />
            <TournamentDetailsInfoContentStyled>
              <ALinkStyled
                href={`https://www.google.com/maps/search/?api=1&query=${tournament.address
                  .split(" ")
                  .join("+")}+${tournament.city.split(" ").join("+")}`}
                target="_blank"
              >
                {tournament.address} {tournament.city}
              </ALinkStyled>
            </TournamentDetailsInfoContentStyled>
          </TournamentDetailsInfoStyled>
        ) : null}
      </MainContainerContentStyled>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          deleteTournament(tournament.id);
        }}
        style={{ margin: "5px auto", width: "fit-content" }}
      >
        Usuń Turniej
      </Button>
      {children}
    </MainContainerStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTournament: (favoriteTournaments: Id) =>
      dispatch(deleteTournament(favoriteTournaments)),
  };
};
export default connect(null, mapDispatchToProps)(TournamentInfo);
