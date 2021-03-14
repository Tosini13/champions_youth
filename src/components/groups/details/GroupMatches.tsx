import React from "react";

import { List } from "@material-ui/core";
import {
  LinkStyled,
  SectionContentStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { routerGenerateConst } from "../../../const/menuConst";
import MatchSummary from "../../matches/MatchSummary/MatchSummary";
import { Id } from "../../../const/structuresConst";
import { MatchModel } from "../../../NewModels/Matches";
import { LOCALE } from "../../../locale/config";

export interface GroupMatchesViewProps {
  tournamentId: Id;
  groupId: Id;
  matches: MatchModel[];
  locale: LOCALE;
}

const GroupMatchesView: React.SFC<GroupMatchesViewProps> = ({
  locale,
  tournamentId,
  groupId,
  matches,
}) => {
  return (
    <SectionStyled>
      <SectionContentStyled>
        <List>
          {matches.map((match) => (
            <LinkStyled
              key={match.id}
              to={routerGenerateConst.matchGroup(groupId, match.id)}
            >
              <MatchSummary match={match} locale={locale} />
            </LinkStyled>
          ))}
        </List>
      </SectionContentStyled>
    </SectionStyled>
  );
};

export default GroupMatchesView;
