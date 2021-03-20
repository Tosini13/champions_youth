import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { connect } from "react-redux";
import { PlaceLabel } from "./MatchSummaryMock";
import matchDict from "../../locale/matchDict";
import { isNumber } from "util";
import { LOCALE } from "../../locale/config";
import { TeamData } from "../../models/teamData";
import { Placeholder } from "../../NewModels/Team";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { Typography } from "@material-ui/core";

export interface ShowTeamProps {
  team?: TeamData;
  placeholder?: Placeholder;
  locale: LOCALE;
}
const ShowTeam: React.FC<ShowTeamProps> = ({ team, placeholder, locale }) => {
  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(placeholder?.name ?? "");
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <Typography variant="body2" color="secondary">
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(ShowTeam);
