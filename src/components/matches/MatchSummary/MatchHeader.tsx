import React from "react";
import moment, { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { Grid } from "@material-ui/core";

import { matchModeConst } from "../../../const/matchConst";
import { LOCALE } from "../../../locale/config";
import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import useTranslationHelp from "../../../hooks/useTranslationHelp";
import matchDict from "../../../locale/matchDict";
import {
  TypographyLiveMatchHeader,
  TypographyMatchHeader,
} from "../../../styled/styledComponents/match/styledTypography";

export interface MatchHeaderProps {
  mode: matchModeConst;
  round: string;
  date?: Moment;
  locale: LOCALE;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({
  mode,
  round,
  date,
  locale,
}) => {
  const { translateRound } = useTranslationHelp();
  const { round: matchRound, number } = translateRound(round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchHeaderContainer>
        <Grid item xs={5}>
          {round ? (
            <TypographyMatchHeader>
              <Translator id="round" /> <Translator id={matchRound} /> {number}
            </TypographyMatchHeader>
          ) : null}
        </Grid>
        <Grid item xs={2}>
          {mode === matchModeConst.live ? (
            <TypographyLiveMatchHeader>LIVE</TypographyLiveMatchHeader>
          ) : null}
        </Grid>
        <Grid item xs={5}>
          {date ? (
            <TypographyMatchHeader align="right">
              {moment(date).format("YYYY-MM-DD HH:mm")}
            </TypographyMatchHeader>
          ) : null}
        </Grid>
      </MatchHeaderContainer>
    </Rosetta>
  );
};

export default MatchHeader;
