import React from "react";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PlaceIcon from "@material-ui/icons/Place";
import Button from "@material-ui/core/Button";

import {
  ALinkStyled,
  MainContainerContentStyled,
  MainContainerStyled,
  TournamentDetailsInfoContentStyled,
  TournamentDetailsInfoStyled,
  TournamentTitle,
} from "../../../styled/styledTournamentInfo";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import { deleteTournament } from "../../../store/actions/TournamentActions";
import { connect } from "react-redux";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";
import Logo, { SIZE_LOGO } from "../../global/Logo";

type Props = {
  tournament: TournamentData;
  image: string;
  deleteTournament: (tournamentId: Id) => void;
  locale: LOCALE;
};

const TournamentInfo: React.FC<Props> = ({
  tournament,
  deleteTournament,
  children,
  image,
  locale,
}) => {
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <MainContainerStyled>
        <MainContainerContentStyled>
          <TournamentDetailsInfoStyled>
            <Logo src={image} size={SIZE_LOGO.lg} />
            <TournamentTitle>{tournament.name}</TournamentTitle>
          </TournamentDetailsInfoStyled>
          <TournamentDetailsInfoStyled>
            <EventAvailableIcon fontSize="small" />
            <TournamentDetailsInfoContentStyled>
              {moment(tournament.date).locale(locale).format("yyyy MMMM DD")}
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
          <Translator id="deleteTournament" />
        </Button>
        {children}
      </MainContainerStyled>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTournament: (favoriteTournaments: Id) =>
      dispatch(deleteTournament(favoriteTournaments)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentInfo);
