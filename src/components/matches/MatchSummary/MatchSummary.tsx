import React, { useEffect, useState } from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import { MatchData } from "../../../structures/match";
import MatchContent from "./MatchContent";
import { LOCALE } from "../../../locale/config";
import {
  getImage,
  getImageJustUploaded,
} from "../../tournaments/actions/getImage";
import { Id } from "../../../const/structuresConst";
import Logo, { SIZE_LOGO } from "../../global/Logo";
import MatchHeader from "./MatchHeader";
import {
  AwayLogoContainer,
  HomeLogoContainer,
} from "../../../styled/styledComponents/match/styledLogo";

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
    <MatchContainer>
      <HomeLogoContainer>
        <Logo src={imageHome} size={SIZE_LOGO.md} />
      </HomeLogoContainer>
      <MatchContentContainer>
        <MatchHeader
          locale={locale}
          mode={match.mode}
          date={match.date}
          round={match.round}
        />
        <MatchContent match={match} />
      </MatchContentContainer>
      <AwayLogoContainer>
        <Logo src={imageAway} size={SIZE_LOGO.md} />
      </AwayLogoContainer>
    </MatchContainer>
  );
};

export default MatchSummary;
