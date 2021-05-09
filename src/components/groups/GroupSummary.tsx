import React from "react";

import Grid from "@material-ui/core/Grid";

import { useParams } from "react-router-dom";
import { routerGenerateConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";
import { Group } from "../../models/groupData";
import { LinkStyled } from "../../styled/styledLayout";
import {
  GroupHeaderContainer,
  GroupTeamsContainer,
} from "../../styled/styledComponents/group/styledLayout";
import { TypographyPrimaryText } from "../../styled/styledComponents/styledTypography";
import GroupTeamSummary from "./GroupTeamSummary";

export interface GroupsComponentProps {
  group: Group;
}

const GroupSummary: React.FC<GroupsComponentProps> = ({ group }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  return (
    <LinkStyled
      to={group.id ? routerGenerateConst.groups(tournamentId, group.id) : ""}
    >
      <Grid container direction="column">
        <Grid item>
          <GroupHeaderContainer>
            <TypographyPrimaryText align="center" style={{ color: "white" }}>
              {group.name}
            </TypographyPrimaryText>
          </GroupHeaderContainer>
        </Grid>
        <Grid item>
          <GroupTeamsContainer>
            {group.teams?.map((team) => (
              <Grid item key={team.id}>
                <GroupTeamSummary team={team} tournamentId={tournamentId} />
              </Grid>
            ))}
          </GroupTeamsContainer>
        </Grid>
      </Grid>
    </LinkStyled>
  );
};

export default GroupSummary;
