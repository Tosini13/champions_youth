import React, { useEffect, useState } from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import { MatchData } from "../../../structures/match";
import MatchContent from "./MatchContent";
import {
  getImage,
  getImageJustUploaded,
} from "../../tournaments/actions/getImage";
import { Id } from "../../../const/structuresConst";
import Logo, { SIZE_LOGO, TeamLogo } from "../../global/Logo";
import MatchHeader from "./MatchHeader";
import {
  AwayLogoContainer,
  HomeLogoContainer,
} from "../../../styled/styledComponents/match/styledLogo";
import { useParams } from "react-router";

type TUrlParams = {
  tournamentId: Id;
};

export interface MatchSummaryProps {
  match: MatchData;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match }) => {
  const { tournamentId } = useParams<TUrlParams>();

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
        <TeamLogo teamLogo={match.home?.logo} size={SIZE_LOGO.md} />
      </HomeLogoContainer>
      <MatchContentContainer>
        <MatchHeader mode={match.mode} date={match.date} round={match.round} />
        <MatchContent match={match} />
      </MatchContentContainer>
      <AwayLogoContainer>
        <TeamLogo teamLogo={match.away?.logo} size={SIZE_LOGO.md} />
      </AwayLogoContainer>
    </MatchContainer>
  );
};

export default MatchSummary;
