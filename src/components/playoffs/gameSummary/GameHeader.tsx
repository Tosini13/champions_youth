import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Grid } from "@material-ui/core";

import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import useTranslationHelp from "../../../hooks/useTranslationHelp";
import matchDict from "../../../locale/matchDict";
import { TypographyMatchHeader } from "../../../styled/styledComponents/match/styledTypography";
import { useLocale } from "../../../Provider/LocaleProvider";

export interface MatchHeaderProps {
  round: string;
}

const GameHeader: React.FC<MatchHeaderProps> = ({ round }) => {
  const { locale } = useLocale();
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
