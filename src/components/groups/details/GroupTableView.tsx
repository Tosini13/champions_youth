import React from "react";

import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

import { GroupModel } from "../../../NewModels/Group";
import GroupTable from "./GroupTable";

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
  console.log(group);
  return (
    <>
      <GroupTable
        matches={group.matches}
        teams={group.teams}
        promotedQtt={group.playOffs ? group.playOffs.length : 1}
        playOffs={group.playOffs}
        playOffsGroup={group.playOffsGroup}
      />
      <Grid
        container
        justify="space-between"
        direction="column"
        alignItems="stretch"
        style={{ marginTop: "10px" }}
      >
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
    </>
  );
};

export default GroupTableView;
