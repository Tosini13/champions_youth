import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { connect } from "react-redux";
import { PlaceLabel } from "./MatchSummaryMock";
import matchDict from "../../locale/matchDict";
import { isNumber } from "util";
import { LOCALE } from "../../locale/config";
import { TeamData } from "../../models/teamData";
import { Placeholder } from "../../NewModels/Team";

export interface ShowTeamProps {
  team?: TeamData;
  placeholder?: Placeholder;
  locale: LOCALE;
}
const ShowTeam: React.FC<ShowTeamProps> = ({ team, placeholder, locale }) => {
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <>
        {team ? (
          team.name
        ) : placeholder ? (
          `${placeholder.name}  `
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
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(ShowTeam);
