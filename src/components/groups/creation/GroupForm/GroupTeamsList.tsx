import React from "react";
import { connect } from "react-redux";
import { Id } from "../../../../const/structuresConst";

import { TeamData } from "../../../../models/teamData";
import { TeamListStyled } from "../../../../styled/styledTeams";
import GroupTeamsListElement from "./GroupTeamsListElement";

export interface GroupTeamsListProps {
  teams: TeamData[];
  userId: Id;
}

const GroupTeamsList: React.FC<GroupTeamsListProps> = ({ userId, teams }) => {
  return (
    <TeamListStyled>
      {teams?.map((team: TeamData) => (
        <GroupTeamsListElement key={team.id} team={team} userId={userId} />
      ))}
    </TeamListStyled>
  );
};

const mapStateToProps = (state: any) => {
  return {
    locale: state.dictionary.locale,
    userId: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(GroupTeamsList);
