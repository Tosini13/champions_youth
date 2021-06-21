import React from "react";

import {
  LinkStyled,
  ListContainerSection,
  SectionContentStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { routerGenerateConst } from "../../../const/menuConst";
import MatchSummary from "../../matches/MatchSummary/MatchSummary";
import { Id } from "../../../const/structuresConst";
import { MatchModel } from "../../../NewModels/Matches";

export interface GroupMatchesViewProps {
  tournamentId: Id;
  groupId: Id;
  matches: MatchModel[];
}

const GroupMatchesView: React.SFC<GroupMatchesViewProps> = ({
  tournamentId,
  groupId,
  matches,
}) => {
  return (
    <SectionStyled>
      <SectionContentStyled>
        <ListContainerSection>
          {matches.map((match) => (
            <LinkStyled
              key={match.id}
              to={routerGenerateConst.matchGroup(groupId, match.id)}
            >
              <MatchSummary match={match} />
            </LinkStyled>
          ))}
        </ListContainerSection>
      </SectionContentStyled>
    </SectionStyled>
  );
};

export default GroupMatchesView;
