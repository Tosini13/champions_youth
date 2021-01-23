import React from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { GroupModel } from "../../../NewModels/Group";
import { LinkStyled } from "../../../styled/styledLayout";
import { routerGenerateConst } from "../../../const/menuConst";
import { Id } from "../../../const/structuresConst";
import { GroupTeamText, GroupTitleText } from "../../../styled/styledGroup";
import { Group } from "../../../models/groupData";
import { TeamData } from "../../../models/teamData";

export interface GroupsComponentProps {
  group: GroupModel;
  groups?: Group[];
  teams: TeamData[];
}

const GroupSummary: React.FC<GroupsComponentProps> = ({
  group,
  groups,
  teams,
}) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  console.log(group);
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
        {group.groupTeams?.map((team) => (
          <GroupTeamText key={`${team.id}${team.place}`}>
            {teams.find((t) => t.id === team.id)?.name ??
              groups?.find((group) => group.id === team.group?.id)?.name +
                " " +
                team.group?.place}
          </GroupTeamText>
        ))}
      </Grid>
    </div>
  );
};

export default GroupSummary;
