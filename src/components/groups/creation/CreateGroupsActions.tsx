import React from "react";
import styled from "styled-components";

import { Grid } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import AddIcon from "@material-ui/icons/Add";

const GridContainer = styled(Grid)`
  position: fixed;
  bottom: 0px;
  transform: translateY(-180%);
`;

export interface CreateGroupsActionsProps {
  add: () => void;
  draw: () => void;
}

const CreateGroupsActions: React.FC<CreateGroupsActionsProps> = ({
  add,
  draw,
}) => {
  return (
    <GridContainer container justify="space-evenly">
      <Grid item>
        <Fab color="secondary" size="small" onClick={draw}>
          <AutorenewIcon />
        </Fab>
      </Grid>
      <Grid item>
        <Fab color="secondary" size="small" onClick={add}>
          <AddIcon />
        </Fab>
      </Grid>
    </GridContainer>
  );
};

export default CreateGroupsActions;
