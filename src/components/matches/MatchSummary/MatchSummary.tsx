import React, { useEffect, useState } from "react";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import {
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
import {
  getImage,
  getImageJustUploaded,
} from "../../tournaments/actions/getImage";
import { Id } from "../../../const/structuresConst";
import Logo, { SIZE_LOGO } from "../../global/Logo";

const MatchContainerStyled = styled(Grid)`
  height: 60px;
  max-width: 300px;
  position: relative;
  margin: auto;
`;

const MatchContentGridStyled = styled(Grid)`
  height: 25px;
  flex-grow: 1;
  background: linear-gradient(
    90deg,
    rgba(2, 105, 226, 0.15) 0%,
    rgba(2, 105, 226, 0.8) 27.08%,
    #0269e2 52.08%,
    rgba(2, 105, 226, 0.8) 77.6%,
    rgba(2, 105, 226, 0.15) 100%
  );
`;

const HomeLogoContainer = styled.div`
  position: absolute;
  left: -15px;
`;

const AwayLogoContainer = styled.div`
  position: absolute;
  right: -15px;
`;

const MatchHeader = styled(Grid)`
  background-color: ${mainTheme.palette.primary.main};
  padding: 1px 6px;
  font-size: 9px;
`;

export interface MatchSummaryProps {
  match: MatchData;
  locale: LOCALE;
  tournamentId: Id;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({
  match,
  locale,
  tournamentId,
}) => {
  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(match.round);
  const [imageHome, setImageHome] = useState<any>(null);
  const [imageAway, setImageAway] = useState<any>(null);

  useEffect(() => {
    if (match.home?.logo) {
      getImage(match.home?.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && match.home?.logo) {
            img =
              getImageJustUploaded(match.home?.logo, tournamentId) ?? undefined;
          }
          setImageHome(img);
        })
        .catch((err) => console.log("err", err));
    }

    if (match.away?.logo) {
      getImage(match.away?.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && match.away?.logo) {
            img =
              getImageJustUploaded(match.away?.logo, tournamentId) ?? undefined;
          }
          setImageAway(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [match, tournamentId]);

  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchContainerStyled container justify="center" alignItems="center">
        <HomeLogoContainer>
          <Logo src={imageHome} size={SIZE_LOGO.md} />
        </HomeLogoContainer>
        <MatchContentGridStyled item>
          <MatchContent match={match} />
        </MatchContentGridStyled>
        <AwayLogoContainer>
          <Logo src={imageAway} size={SIZE_LOGO.md} />
        </AwayLogoContainer>
        {/* <MatchHeader container justify="space-between">
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
        </MatchHeader> */}
        {/* <MatchContent match={match} /> */}
      </MatchContainerStyled>
    </Rosetta>
  );
};

export default MatchSummary;
