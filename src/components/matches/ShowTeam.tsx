import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { PlaceLabel } from "./MatchSummaryMock";
import matchDict from "../../locale/matchDict";
import { isNumber } from "util";
import { TeamData } from "../../models/teamData";
import { Placeholder } from "../../NewModels/Team";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { Typography } from "@material-ui/core";
import { useLocale } from "../../Provider/LocaleProvider";

export interface ShowTeamProps {
  team?: TeamData | null;
  placeholder?: Placeholder;
}
const ShowTeam: React.FC<ShowTeamProps> = ({ team, placeholder }) => {
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(placeholder?.name ?? "");
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <Typography
        color="secondary"
        style={{ color: "white", fontSize: "0.9rem" }}
      >
        {team ? (
          team.name
        ) : placeholder ? (
          <>
            <Translator id={round} /> {number}
          </>
        ) : (
          <Translator id="noTeam" />
        )}
        {!team && placeholder?.place ? (
          <PlaceLabel>
            <Translator id={placeholder.place.toString()} />
          </PlaceLabel>
        ) : null}
        {!team && isNumber(placeholder?.place) ? (
          <PlaceLabel>
            <Translator id="place" />
          </PlaceLabel>
        ) : null}
      </Typography>
    </Rosetta>
  );
};

export default ShowTeam;
