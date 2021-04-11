import React, { useState } from "react";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import Button from "@material-ui/core/Button";
import {
  Share as ShareIcon,
  Place,
  Schedule,
  EventAvailable,
} from "@material-ui/icons";

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
import { setInProgress } from "../../global/InProgress";
import { useHistory } from "react-router-dom";
import { routerConstString } from "../../../const/menuConst";
import { useNotification } from "../../global/Notification";
import Share from "../../share/Share";

type Props = {
  tournament: TournamentData;
  image: string;
  deleteTournament: (
    tournament: TournamentData,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
  locale: LOCALE;
  isOwner: boolean;
  tournamentId: Id;
};

const TournamentInfo: React.FC<Props> = ({
  tournament,
  deleteTournament,
  children,
  image,
  locale,
  isOwner,
  tournamentId,
}) => {
  const [openShare, setOpenShare] = useState<boolean>(false);
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const history = useHistory();

  const handleExecuteDelete = () => {
    setInProgress(true);
    deleteTournament(
      tournament,
      () => {
        setInProgress(false);
        history.push(routerConstString.tournaments);
      },
      () => {
        setInProgress(false);
      }
    );
  };

  const handleDelete = () => {
    setQuestion("doDeleteTournament");
    setAnswers([
      {
        title: "yes",
        action: handleExecuteDelete,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };

  return (
    <>
      <Rosetta translations={tournamentDetailsDict} locale={locale}>
        <MainContainerStyled>
          <MainContainerContentStyled>
            <TournamentDetailsInfoStyled>
              <Logo src={image} size={SIZE_LOGO.lg} />
              <TournamentTitle>{tournament.name}</TournamentTitle>
            </TournamentDetailsInfoStyled>
            <TournamentDetailsInfoStyled
              onClick={() => setOpenShare(true)}
              style={{ cursor: "pointer" }}
            >
              <ShareIcon fontSize="small" />
              <TournamentDetailsInfoContentStyled>
                <Translator id="share" />
              </TournamentDetailsInfoContentStyled>
            </TournamentDetailsInfoStyled>
            <TournamentDetailsInfoStyled>
              <EventAvailable fontSize="small" />
              <TournamentDetailsInfoContentStyled>
                {moment(tournament.date).locale(locale).format("yyyy MMMM DD")}
              </TournamentDetailsInfoContentStyled>
            </TournamentDetailsInfoStyled>
            <TournamentDetailsInfoStyled>
              <Schedule fontSize="small" />
              <TournamentDetailsInfoContentStyled>
                {moment(tournament.date).format("HH:mm")}
              </TournamentDetailsInfoContentStyled>
            </TournamentDetailsInfoStyled>
            {tournament.address?.localeCompare("") &&
            tournament.city?.localeCompare("") ? (
              <TournamentDetailsInfoStyled>
                <Place fontSize="small" />
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
          {isOwner ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
              style={{ margin: "5px auto", width: "fit-content" }}
            >
              <Translator id="deleteTournament" />
            </Button>
          ) : null}
          {children}
        </MainContainerStyled>
      </Rosetta>
      <Share
        locale={locale}
        open={openShare}
        handleClose={() => setOpenShare(false)}
        message={`${process.env.REACT_APP_URL}/tournament/${tournamentId}`}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteTournament: (
      tournament: TournamentData,
      callBackSuccess?: () => void,
      callBackError?: () => void
    ) => dispatch(deleteTournament(tournament, callBackSuccess, callBackError)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TournamentInfo);
