import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Grid } from "@material-ui/core";

import { LOCALE } from "../../../locale/config";
import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import useTranslationHelp from "../../../hooks/useTranslationHelp";
import matchDict from "../../../locale/matchDict";
import { TypographyMatchHeader } from "../../../styled/styledComponents/match/styledTypography";

export interface MatchHeaderProps {
  round: string;
  locale: LOCALE;
}

const GameHeader: React.FC<MatchHeaderProps> = ({ round, locale }) => {
  const { translateRound } = useTranslationHelp();
  const { round: gameRound, number } = translateRound(round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchHeaderContainer justify="center">
        <Grid item>
          {round ? (
            <TypographyMatchHeader>
              <Translator id="round" /> <Translator id={gameRound} /> {number}
            </TypographyMatchHeader>
          ) : null}
        </Grid>
      </MatchHeaderContainer>
    </Rosetta>
  );
};

export default GameHeader;
