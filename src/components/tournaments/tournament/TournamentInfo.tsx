import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Delete, Edit } from "@material-ui/icons";

import {
  MainContainerContentStyled,
  MainContainerStyled,
} from "../../../styled/styledTournamentInfo";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import { deleteTournament } from "../../../store/actions/TournamentActions";
import { connect } from "react-redux";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { setInProgress } from "../../global/InProgress";
import { useHistory } from "react-router-dom";
import {
  routerConstString,
  routerGenerateConst,
} from "../../../const/menuConst";
import { useNotification } from "../../global/Notification";
import Share from "../../share/Share";
import TournamentInfoHeader from "./info/TournamentInfoHeader";
import TournamentMainInfo from "./info/TournamentMainInfo";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";
import { Grid } from "@material-ui/core";
import {
  SectionFooterStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  tournament: TournamentData;
  image: string;
  deleteTournament: (
    tournament: TournamentData,
    callBackSuccess?: () => void,
    callBackError?: () => void
  ) => void;
  isOwner: boolean;
  tournamentId: Id;
};

const TournamentInfo: React.FC<Props> = ({
  tournament,
  deleteTournament,
  children,
  image,
  isOwner,
  tournamentId,
}) => {
  const { locale } = useLocale();
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
        <SectionStyled style={{ padding: "20px" }}>
          <MainContainerStyled>
            <MainContainerContentStyled>
              <TournamentInfoHeader image={image} title={tournament.name} />
              <TournamentMainInfo
                date={tournament.date}
                city={tournament.city}
                address={tournament.address}
                tournamentId={tournamentId}
              />
            </MainContainerContentStyled>
            {children}
          </MainContainerStyled>
          <SectionFooterStyled>
            {isOwner ? (
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <ButtonRC
                    startIcon={<Edit />}
                    onClick={() =>
                      history.push(
                        routerGenerateConst.editTournament(tournamentId)
                      )
                    }
                  >
                    <Translator id="editTournament" />
                  </ButtonRC>
                </Grid>
                <Grid item>
                  <ButtonRC onClick={handleDelete} startIcon={<Delete />}>
                    <Translator id="deleteTournament" />
                  </ButtonRC>
                </Grid>
              </Grid>
            ) : null}
          </SectionFooterStyled>
        </SectionStyled>
      </Rosetta>
      <Share
        open={openShare}
        handleClose={() => setOpenShare(false)}
        message={`${process.env.REACT_APP_URL}/tournament/${tournamentId}`}
      />
    </>
  );
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
export default connect(null, mapDispatchToProps)(TournamentInfo);
