import React from "react";

import Grid from "@material-ui/core/Grid";

import { Group } from "../../structures/dbAPI/groupData";
import { GroupTeamText, GroupTitleText } from "../../styled/styledGroup";
import { Link, useParams } from "react-router-dom";
import { routeConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";

export interface GroupsComponentProps {
  group: Group;
}

const GroupSummary: React.FC<GroupsComponentProps> = ({ group }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  return (
    <div>
      <Link to={group.id ? routeConst.group(tournamentId, group.id) : ""}>
        <GroupTitleText>{group.name}</GroupTitleText>
      </Link>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        {group.teams?.map((team) => (
          <GroupTeamText key={team.id}>{team.name}</GroupTeamText>
        ))}
      </Grid>
    </div>
  );
};

export default GroupSummary;
