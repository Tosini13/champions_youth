import React from "react";

import { Grid, List } from "@material-ui/core";
import { LinkStyled } from "../../../styled/styledLayout";
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
    <Grid item>
      <List>
        {matches.map((match) => (
          <LinkStyled
            key={match.id}
            to={routerGenerateConst.matchGroup(tournamentId, groupId, match.id)}
          >
            <MatchSummary match={match} />
          </LinkStyled>
        ))}
      </List>
    </Grid>
  );
};

export default GroupMatchesView;
