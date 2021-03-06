import React from "react";

import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";

import { GroupModel } from "../../../../NewModels/Group";
import GroupTable from "./GroupTable";
import {
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../../../styled/styledLayout";

export interface GroupTableViewProps {
  group: GroupModel;
  handleFinishGroup: () => void;
  handleContinueGroup: () => void;
}

const GroupTableView: React.FC<GroupTableViewProps> = ({
  group,
  handleFinishGroup,
  handleContinueGroup,
}) => {
  // TODO: REMOVE BUTTONS WHEN THERE'S NO PLAYOFFS - OR SET WINNERS
  return (
    <SectionStyled>
      <SectionNavStyled>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ padding: "10px" }}
        >
          <Grid item>
            <Typography color="secondary">{group.name}</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                {group.finished === true ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ margin: "0px auto" }}
                    onClick={handleContinueGroup}
                  >
                    Continue Group
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ margin: "0px auto" }}
                    onClick={handleFinishGroup}
                  >
                    Finish Group
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SectionNavStyled>
      <SectionContentStyled>
        <GroupTable
          matches={group.matches}
          teams={group.teams}
          promotedQtt={group.playOffs ? group.playOffs.length : 1}
          playOffs={group.playOffs}
          playOffsGroup={group.playOffsGroup}
        />
      </SectionContentStyled>
    </SectionStyled>
  );
};

export default GroupTableView;
