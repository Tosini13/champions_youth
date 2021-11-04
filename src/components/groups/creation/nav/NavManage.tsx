import React from "react";

import { Grid, IconButton, Hidden } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Add } from "@material-ui/icons";

export interface NavManageProps {
  openSettings: () => void;
  add: () => void;
  draw?: () => void;
}

const NavManage: React.FC<NavManageProps> = ({ openSettings, add, draw }) => {
  return (
    <Grid container spacing={5}>
      {draw && (
        <Hidden smDown>
          <Grid item>
            <IconButton
              size="small"
              color="secondary"
              onClick={draw}
              aria-label="draw-groups"
            >
              <AutorenewIcon />
            </IconButton>
          </Grid>
        </Hidden>
      )}
      <Grid item>
        <IconButton
          size="small"
          color="secondary"
          onClick={openSettings}
          aria-label="open-setting"
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <IconButton
            size="small"
            color="secondary"
            onClick={add}
            aria-label="add-group"
          >
            <Add />
          </IconButton>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default NavManage;
