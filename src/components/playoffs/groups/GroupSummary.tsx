import React from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { GroupModel } from "../../../NewModels/Group";
import { LinkStyled } from "../../../styled/styledLayout";
import { routerGenerateConst } from "../../../const/menuConst";
import { Id } from "../../../const/structuresConst";
import { GroupTeamText, GroupTitleText } from "../../../styled/styledGroup";

export interface GroupsComponentProps {
  group: GroupModel;
}

const GroupSummary: React.FC<GroupsComponentProps> = ({ group }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  return (
    <div>
      <LinkStyled
        to={
          group.id
            ? routerGenerateConst.playOffsGroup(tournamentId, group.id)
            : ""
        }
      >
        <GroupTitleText>{group.name}</GroupTitleText>
      </LinkStyled>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        {group.placeholderTeams?.map((team) => (
          <GroupTeamText key={`${team.id}${team.place}`}>
            {team.id} {team.place}
          </GroupTeamText>
        ))}
      </Grid>
    </div>
  );
};

export default GroupSummary;
