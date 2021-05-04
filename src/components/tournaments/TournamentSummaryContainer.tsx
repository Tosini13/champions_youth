import React, { useEffect } from "react";
import styled from "styled-components";
import { Rosetta, Translator } from "react-rosetta";

import { LOCALE } from "../../locale/config";
import { UserData } from "../../models/credentialsData";
import { TournamentData } from "../../models/tournamentData";
import tournamentDashboardDict from "../../locale/tournamentDashboard";
import { NoContentContainer } from "../../styled/styledLayout";
import TournamentSummary from "./tournamentSummary/TournamentSummary";
import { Button, Divider, List } from "@material-ui/core";
import { ScrollBarStyled } from "../../styled/styledScrollBar";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import { useTournamentNav } from "../../hooks/useTournamentNavs";

const ListStyled = styled(List)`
  padding: 0px 2px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ${ScrollBarStyled}
`;
export interface TournamentSummaryContainerProps {
  user?: UserData;
  tournaments?: TournamentData[];
  locale: LOCALE;
  handleRedirectLogin: () => void;
}

const TournamentSummaryContainer: React.FC<TournamentSummaryContainerProps> = ({
  user,
  tournaments,
  locale,
  handleRedirectLogin,
}) => {
  const { clearLocalStorageTournamentNav } = useTournamentNav();
  useEffect(() => {
    clearLocalStorageTournamentNav();
  }, [clearLocalStorageTournamentNav]);
  return (
    <Rosetta translations={tournamentDashboardDict} locale={locale}>
      <>
        {!tournaments?.length && user ? (
          <TypographyPrimaryText align="center" style={{ marginTop: "30px" }}>
            <Translator id={"noTournaments"} />
          </TypographyPrimaryText>
        ) : null}
        {!tournaments?.length && !user ? (
          <NoContentContainer>
            <TypographyPrimaryText align="center">
              <Translator id={"mustBeLoggedInToAddTournament"} />
            </TypographyPrimaryText>
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
            <React.Fragment key={tournament.id}>
              <TournamentSummary tournament={tournament} user={user} />
              <Divider color="primary" />
            </React.Fragment>
          ))}
        </ListStyled>
      </>
    </Rosetta>
  );
};

export default TournamentSummaryContainer;
