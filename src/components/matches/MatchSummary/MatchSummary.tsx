import React from "react";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchRoundDateStyled,
} from "../../../styled/styledMatch";
import { MatchData } from "../../../structures/match";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";
import { mainTheme, styledColors } from "../../../styled/styledConst";
import MatchContent from "./MatchContent";
import { LOCALE } from "../../../locale/config";
import matchDict from "../../../locale/matchDict";
import useTranslationHelp from "../../../hooks/useTranslationHelp";

const MatchHeader = styled(Grid)`
  background-color: ${mainTheme.palette.primary.main};
  padding: 1px 6px;
  font-size: 9px;
`;

export interface MatchSummaryProps {
  match: MatchData;
  locale: LOCALE;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match, locale }) => {
  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(match.round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchContainerStyled>
        <MatchHeader container justify="space-between">
          <Grid item>
            {match.round ? (
              <MatchRoundTitleStyled>
                <Translator id="round" /> <Translator id={round} /> {number}
              </MatchRoundTitleStyled>
            ) : null}
          </Grid>
          <Grid item>
            {match.mode === matchModeConst.live ? (
              <Typography
                style={{ fontSize: "9px", color: styledColors.icons.live }}
              >
                LIVE
              </Typography>
            ) : null}
          </Grid>
          <Grid item>
            {match.date ? (
              <MatchRoundDateStyled>
                {moment(match.date).format("YYYY-MM-DD HH:mm")}
              </MatchRoundDateStyled>
            ) : null}
          </Grid>
        </MatchHeader>
        <MatchContent match={match} />
      </MatchContainerStyled>
    </Rosetta>
  );
};

export default MatchSummary;
