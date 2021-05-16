import React from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import { GroupModel } from "../../../NewModels/Group";
import { LinkStyled } from "../../../styled/styledLayout";
import { routerGenerateConst } from "../../../const/menuConst";
import { Id } from "../../../const/structuresConst";
import { GroupHeaderContainer } from "../../../styled/styledComponents/group/styledLayout";
import { Group } from "../../../models/groupData";
import { TeamData } from "../../../models/teamData";
import { TypographyPrimaryText } from "../../../styled/styledComponents/styledTypography";
import {
  GroupTeamsContainer,
  GroupTeamSummaryContainer,
} from "../../../styled/styledComponents/group/styledLayout";
import GroupTeamSummary from "../../groups/GroupTeamSummary";

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
  return (
    <LinkStyled
      to={
        group.id
          ? routerGenerateConst.playOffsGroup(tournamentId, group.id)
          : ""
      }
    >
      <Grid container direction="column">
        <Grid item>
          <GroupHeaderContainer>
            <TypographyPrimaryText align="center" style={{ color: "white" }}>
              {group.name}
            </TypographyPrimaryText>
          </GroupHeaderContainer>
        </Grid>
        <Grid item style={{ marginTop: "4px" }}>
          <GroupTeamsContainer>
            {group.groupTeams?.map((team) => {
              const exisitingTeam = teams.find((t) => t.id === team.id);
              if (exisitingTeam) {
                return (
                  <GroupTeamSummaryContainer key={`${team.id}${team.place}`}>
                    <GroupTeamSummary
                      team={exisitingTeam}
                      tournamentId={tournamentId}
                    />
                  </GroupTeamSummaryContainer>
                );
              }
              return (
                <GroupTeamSummaryContainer key={`${team.id}${team.place}`}>
                  <TypographyPrimaryText align="left">
                    {teams.find((t) => t.id === team.id)?.name ??
                      groups?.find((group) => group.id === team.group?.id)
                        ?.name +
                        " " +
                        team.group?.place}
                  </TypographyPrimaryText>
                </GroupTeamSummaryContainer>
              );
            })}
          </GroupTeamsContainer>
        </Grid>
      </Grid>
    </LinkStyled>
  );
};

export default GroupSummary;
