import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import DoneIcon from "@material-ui/icons/Done";
import RoomIcon from "@material-ui/icons/Room";

export function ColorlibStepIcon(props: any) {
  const theme = useTheme();

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
      zIndex: 1,
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
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.text.primary,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.text.primary,
    },
  });

  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: any = {
    1: <EmojiEventsIcon className={classes.icon} />,
    2: <RoomIcon className={classes.icon} />,
    3: <DoneIcon className={classes.icon} />,
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
