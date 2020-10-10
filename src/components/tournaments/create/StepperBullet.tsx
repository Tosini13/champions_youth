import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import DoneIcon from "@material-ui/icons/Done";
import RoomIcon from "@material-ui/icons/Room";
import { mainTheme } from "../../../styled/styledConst";

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: mainTheme.palette.primary.light,
    zIndex: 1,
    color: "#fff",
    width: 28,
    height: 28,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "0.8em",
    height: "0.8em",
  },
  active: {
    backgroundColor: mainTheme.palette.secondary.main,
    color: mainTheme.palette.primary.main,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: mainTheme.palette.primary.light,
  },
});

export function ColorlibStepIcon(props: any) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: any = {
    1: <EmojiEventsIcon className={classes.icon} />,
    2: <SportsSoccerIcon className={classes.icon} />,
    3: <RoomIcon className={classes.icon} />,
    4: <DoneIcon className={classes.icon} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};
