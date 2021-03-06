import React from "react";
import { Rosetta } from "react-rosetta";

import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";
import matchDict from "../../../locale/matchDict";
import { styledColors } from "../../../styled/themes/other";
import { parseStyledBoolean } from "../../../helpers/booleanParser";
import ShowTeam from "../../matches/ShowTeam";
import { Game } from "../../../models/gameData";
import { MatchData } from "../../../structures/match";
import {
  GridMatchContainer,
  HostName,
  GuestName,
  ResultTypographyStyled,
} from "../../matches/MatchSummary/MatchContent";
import { useLocale } from "../../../Provider/LocaleProvider";

const ResultReturnMatchTypographyStyled = styled(Typography)<{
  islive?: string;
}>`
  color: black;
  ${(props) =>
    props.islive
      ? `
  color: ${styledColors.icons.live};
  font-weight: bold;`
      : ""}
  font-size: 12px;
`;

export interface MatchContentProps {
  game: Game;
  match?: MatchData;
  returnMatch?: MatchData;
}

const GameContent: React.FC<MatchContentProps> = ({
  game,
  match,
  returnMatch,
}) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <>
        <GridMatchContainer container alignItems="center" wrap="nowrap">
          <Grid item xs={5}>
            <HostName>
              <ShowTeam
                team={game?.homeTeam}
                placeholder={game?.placeholder?.home}
              />
            </HostName>
          </Grid>
          <Grid item xs={2}>
            {match ? (
              <Result
                mode={match?.mode}
                home={match?.result?.home}
                away={match?.result?.away}
              />
            ) : (
              <ResultTypographyStyled align="center">VS</ResultTypographyStyled>
            )}
            {returnMatch ? (
              <ResultReturnMatch
                mode={returnMatch?.mode}
                home={returnMatch?.result?.home}
                away={returnMatch?.result?.away}
              />
            ) : null}
          </Grid>
          <Grid item xs={5}>
            <GuestName>
              <ShowTeam
                team={game?.awayTeam}
                placeholder={game?.placeholder?.away}
              />
            </GuestName>
          </Grid>
        </GridMatchContainer>
      </>
    </Rosetta>
  );
};

export default GameContent;

type TResultProps = {
  home?: number;
  away?: number;
  mode: string;
};

const Result: React.FC<TResultProps> = ({ home, away, mode }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={5}>
        <ResultTypographyStyled
          align="right"
          islive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          {home ?? ""}
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={2}>
        <ResultTypographyStyled
          align="center"
          islive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          -
        </ResultTypographyStyled>
      </Grid>
      <Grid item xs={5}>
        <ResultTypographyStyled
          align="left"
          islive={parseStyledBoolean(mode === matchModeConst.live)}
        >
          {away ?? ""}
        </ResultTypographyStyled>
      </Grid>
    </Grid>
  );
};

const ResultReturnMatchContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: white;
  color: black;
  width: 44px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

type TResultReturnMatchProps = {
  home?: number;
  away?: number;
  mode: string;
};

const ResultReturnMatch: React.FC<TResultReturnMatchProps> = ({
  home,
  away,
  mode,
}) => {
  return (
    <ResultReturnMatchContainer>
      <Grid container alignItems="center">
        <Grid item xs={5}>
          <ResultReturnMatchTypographyStyled
            align="right"
            islive={parseStyledBoolean(mode === matchModeConst.live)}
          >
            {home ?? ""}
          </ResultReturnMatchTypographyStyled>
        </Grid>
        <Grid item xs={2}>
          <ResultReturnMatchTypographyStyled
            align="center"
            islive={parseStyledBoolean(mode === matchModeConst.live)}
          >
            -
          </ResultReturnMatchTypographyStyled>
        </Grid>
        <Grid item xs={5}>
          <ResultReturnMatchTypographyStyled
            align="left"
            islive={parseStyledBoolean(mode === matchModeConst.live)}
          >
            {away ?? ""}
          </ResultReturnMatchTypographyStyled>
        </Grid>
      </Grid>
    </ResultReturnMatchContainer>
  );
};
