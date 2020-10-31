import React from "react";

import Grid from "@material-ui/core/Grid";

import { GroupTeamText, GroupTitleText } from "../../styled/styledGroup";
import { useParams } from "react-router-dom";
import { routerGenerateConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";
import { Group } from "../../models/groupData";
import { LinkStyled } from "../../styled/styledLayout";

export interface GroupsComponentProps {
  group: Group;
}

const GroupSummary: React.FC<GroupsComponentProps> = ({ group }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  return (
    <div>
      <LinkStyled
        to={group.id ? routerGenerateConst.groups(tournamentId, group.id) : ""}
      >
        <GroupTitleText>{group.name}</GroupTitleText>
      </LinkStyled>
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
