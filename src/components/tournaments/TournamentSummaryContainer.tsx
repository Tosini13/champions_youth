import React, { useEffect } from "react";
import styled from "styled-components";
import { Rosetta, Translator } from "react-rosetta";

import { UserData } from "../../models/credentialsData";
import { TournamentData } from "../../models/tournamentData";
import tournamentDashboardDict from "../../locale/tournamentDashboard";
import {
  ListContainerSection,
  NoContentContainer,
} from "../../styled/styledLayout";
import TournamentSummary from "./tournamentSummary/TournamentSummary";
import { Divider } from "@material-ui/core";
import { ScrollBarStyled } from "../../styled/styledScrollBar";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import { useTournamentNav } from "../../hooks/useTournamentNavs";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";

const ListStyled = styled(ListContainerSection)`
  padding: 0px 2px;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ${ScrollBarStyled}
`;
export interface TournamentSummaryContainerProps {
  user?: UserData;
  tournaments?: TournamentData[];
  handleRedirectLogin: () => void;
}

const TournamentSummaryContainer: React.FC<TournamentSummaryContainerProps> = ({
  user,
  tournaments,
  handleRedirectLogin,
}) => {
  const { locale } = useLocale();
  const { clearLocalStorageTournamentNav } = useTournamentNav();
  useEffect(() => {
    clearLocalStorageTournamentNav();
  }, [clearLocalStorageTournamentNav]);
  return (
    <Rosetta translations={tournamentDashboardDict} locale={locale}>
      {tournaments?.length ? (
        <ListStyled>
          {tournaments?.map((tournament: TournamentData) => (
            <React.Fragment key={tournament.id}>
              <TournamentSummary tournament={tournament} user={user} />
              <Divider color="primary" />
            </React.Fragment>
          ))}
        </ListStyled>
      ) : (
        <TypographyPrimaryText align="center" style={{ marginTop: "30px" }}>
          <Translator id={"noTournaments"} />
        </TypographyPrimaryText>
      )}
    </Rosetta>
  );
};

export default TournamentSummaryContainer;

export interface TournamentsSummaryUserContainerProps {
  user?: UserData;
  tournaments?: TournamentData[];
  handleRedirectLogin: () => void;
}

export const TournamentsSummaryUserContainer: React.FC<TournamentsSummaryUserContainerProps> =
  ({ user, tournaments, handleRedirectLogin }) => {
    const { locale } = useLocale();
    const { clearLocalStorageTournamentNav } = useTournamentNav();
    useEffect(() => {
      clearLocalStorageTournamentNav();
    }, [clearLocalStorageTournamentNav]);
    return (
      <Rosetta translations={tournamentDashboardDict} locale={locale}>
        <>
          {!user ? (
            <NoContentContainer>
              <TypographyPrimaryText
                align="center"
                style={{ margin: "20px 0px" }}
              >
                <Translator id={"mustBeLoggedInToAddTournament"} />
              </TypographyPrimaryText>
              <ButtonRC onClick={handleRedirectLogin}>
                <Translator id={"logIn"} />
              </ButtonRC>
            </NoContentContainer>
          ) : (
            <TournamentSummaryContainer
              user={user}
              tournaments={tournaments}
              handleRedirectLogin={handleRedirectLogin}
            />
          )}
        </>
      </Rosetta>
    );
  };
