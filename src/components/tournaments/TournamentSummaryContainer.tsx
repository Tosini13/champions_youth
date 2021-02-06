import React from "react";
import { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { LOCALE } from "../../locale/config";
import { UserData } from "../../models/credentialsData";
import { TournamentData } from "../../models/tournamentData";
import tournamentDashboardDict from "../../locale/tournamentDashboard";
import { NoContentContainer, NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { Button } from "@material-ui/core";

export interface TournamentSummaryContainerProps {
  user?: UserData;
  tournaments?: TournamentData[];
  locale: LOCALE;
  handleRedirectLogin: () => void;
}

const TournamentSummaryContainer: React.SFC<TournamentSummaryContainerProps> = ({
  user,
  tournaments,
  locale,
  handleRedirectLogin,
}) => {
  return (
    <Rosetta translations={tournamentDashboardDict} locale={locale}>
      <>
        {!tournaments?.length && user ? (
          <NoContentTitle>
            <Translator id={"noTournaments"} />
          </NoContentTitle>
        ) : null}
        {!tournaments?.length && !user ? (
          <NoContentContainer>
            <NoContentTitle>
              <Translator id={"mustBeLoggedInToAddTournament"} />
            </NoContentTitle>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRedirectLogin}
            >
              <Translator id={"logIn"} />
            </Button>
          </NoContentContainer>
        ) : null}
        {tournaments?.map((tournament: TournamentData) => (
          <TournamentSummary
            key={tournament.id}
            tournament={tournament}
            user={user}
          />
        ))}
      </>
    </Rosetta>
  );
};

export default TournamentSummaryContainer;
