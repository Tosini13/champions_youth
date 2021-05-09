import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import MatchSummaryMock from "../../matches/MatchSummaryMock";
import {
  GroupTitleText,
  GroupTeamText,
  GroupContainer,
  GroupHeaderContainer,
} from "../../../styled/styledGroup";
import { GroupData } from "../../../models/groupData";
import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

export interface GroupListProps {
  groups: GroupData[];
  handleChooseGroup: (group: GroupData) => void;
  locale: LOCALE;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  handleChooseGroup,
  locale,
}) => {
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <List style={{ color: "white" }}>
        {groups.map((group) => (
          <GroupContainer key={group.id}>
            <GroupHeaderContainer>
              <GroupTitleText>{group.name}</GroupTitleText>
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
            </GroupHeaderContainer>
            <List>
              {group.matches?.map((match) => (
                <div key={match.id}>
                  <MatchSummaryMock match={match} locale={locale} />
                </div>
              ))}
            </List>
            <ButtonRC
              style={{ width: "100%" }}
              onClick={() => {
                handleChooseGroup(group);
              }}
            >
              <Translator id="add" />
            </ButtonRC>
          </GroupContainer>
        ))}
      </List>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(GroupList);
