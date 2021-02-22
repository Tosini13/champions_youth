import React from "react";
import styled from "styled-components";
import { Rosetta, Translator } from "react-rosetta";

import { LOCALE } from "../../locale/config";
import { UserData } from "../../models/credentialsData";
import { TournamentData } from "../../models/tournamentData";
import tournamentDashboardDict from "../../locale/tournamentDashboard";
import { NoContentContainer, NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";
import { Button, List } from "@material-ui/core";
import { mainTheme } from "../../styled/styledConst";

const ListStyled = styled(List)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${mainTheme.palette.primary.light};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${mainTheme.palette.secondary.dark};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${mainTheme.palette.secondary.dark};
  }
`;
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
        <ListStyled>
          {tournaments?.map((tournament: TournamentData) => (
            <TournamentSummary
              key={tournament.id}
              tournament={tournament}
              user={user}
            />
          ))}
        </ListStyled>
      </>
    </Rosetta>
  );
};

export default TournamentSummaryContainer;
