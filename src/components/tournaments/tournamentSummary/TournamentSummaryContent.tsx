import React from "react";
import moment, { Moment } from "moment";
import styled from "styled-components";

import { Grid, Typography } from "@material-ui/core";

import { TypographyPrimaryText } from "../../../styled/styledComponents/styledTypography";
import {
  TournamentTitleContainer,
  TournamentHeaderContainer,
  TournamentFooterContainer,
} from "../../../styled/styledComponents/tournament/styledLayout";
import { styledColors } from "../../../styled/themes/other";

const TypographyTournamentHeader = styled(TypographyPrimaryText)`
  font-size: 0.7rem;
`;

export interface TournamentSummaryContentProps {
  name: string;
  sponsor: string;
  date?: Moment | string;
  location?: string;
}

const TournamentSummaryContent: React.FC<TournamentSummaryContentProps> = ({
  name,
  sponsor,
  date,
  location,
}) => {
  return (
    <>
      <TournamentSummaryHeader date={date} location={location} />
      <TournamentTitleContainer>
        <Typography
          align="center"
          style={{ color: styledColors.champions.white }}
        >
          {name}
        </Typography>
      </TournamentTitleContainer>
      <TournamentFooterContainer>
        <TypographyTournamentHeader align="center" style={{ color: "white" }}>
          {sponsor}
        </TypographyTournamentHeader>
      </TournamentFooterContainer>
    </>
  );
};

export default TournamentSummaryContent;

const TournamentSummaryHeader: React.FC<
  Omit<TournamentSummaryContentProps, "name" | "sponsor">
> = ({ date, location }) => (
  <TournamentHeaderContainer>
    <Grid container justify="center">
      <Grid item xs={5}>
        <TypographyTournamentHeader>
          {moment(date).format("YYYY-MM-DD")}
        </TypographyTournamentHeader>
      </Grid>
      <Grid item xs={2}>
        <TypographyTournamentHeader
          align="center"
          style={{ color: styledColors.champions.white }}
        >
          {moment(date).format("HH:mm")}
        </TypographyTournamentHeader>
      </Grid>
      <Grid item xs={5}>
        <TypographyTournamentHeader align="right">
          {location}
        </TypographyTournamentHeader>
      </Grid>
    </Grid>
  </TournamentHeaderContainer>
);
