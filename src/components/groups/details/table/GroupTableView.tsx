import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import { GroupModel } from "../../../../NewModels/Group";
import GroupTable from "./GroupTable";
import {
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../../../styled/styledLayout";
import { LOCALE } from "../../../../locale/config";
import groupDetailsDict from "../../../../locale/groupDetails.dict";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";

export interface GroupTableViewProps {
  locale: LOCALE;
  group: GroupModel;
  handleFinishGroup?: () => void;
  handleContinueGroup?: () => void;
}

const GroupTableView: React.FC<GroupTableViewProps> = ({
  locale,
  group,
  handleFinishGroup,
  handleContinueGroup,
}) => {
  // TODO: REMOVE BUTTONS WHEN THERE'S NO PLAYOFFS - OR SET WINNERS
  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <SectionStyled>
        <SectionNavStyled>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ padding: "10px" }}
          >
            <Grid item>
              <Typography color="secondary">
                <Translator id="groupName" />: {group.name}
              </Typography>
            </Grid>
            {handleContinueGroup || handleFinishGroup ? (
              <Grid item>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    {group.finished === true ? (
                      <ButtonRC
                        style={{ margin: "0px auto" }}
                        onClick={handleContinueGroup}
                      >
                        <Translator id="continueGroup" />
                      </ButtonRC>
                    ) : (
                      <ButtonRC
                        style={{ margin: "0px auto" }}
                        onClick={handleFinishGroup}
                      >
                        <Translator id="finishGroup" />
                      </ButtonRC>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </SectionNavStyled>
        <SectionContentStyled>
          <GroupTable
            locale={locale}
            groupTeams={group.groupTeams}
            matches={group.matches}
            teams={group.teams}
            playOffs={group.playOffs}
            playOffsGroup={group.playOffsGroup}
          />
        </SectionContentStyled>
      </SectionStyled>
    </Rosetta>
  );
};

export default GroupTableView;
