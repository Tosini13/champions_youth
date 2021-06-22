import React from "react";
import moment, { Moment } from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { Grid } from "@material-ui/core";

import { matchModeConst } from "../../../const/matchConst";
import { MatchHeaderContainer } from "../../../styled/styledComponents/match/styledLayout";
import useTranslationHelp from "../../../hooks/useTranslationHelp";
import matchDict from "../../../locale/matchDict";
import {
  TypographyLiveMatchHeader,
  TypographyMatchHeader,
} from "../../../styled/styledComponents/match/styledTypography";
import { useLocale } from "../../../Provider/LocaleProvider";

export interface MatchHeaderProps {
  mode: matchModeConst;
  round: string;
  date?: Moment;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ mode, round, date }) => {
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const { round: matchRound, number, isPlayOff } = translateRound(round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchHeaderContainer>
        <Grid item xs={5}>
          {round ? (
            <TypographyMatchHeader>
              {isPlayOff ? null : <Translator id="round" />}{" "}
              <Translator id={matchRound} /> {number}
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
