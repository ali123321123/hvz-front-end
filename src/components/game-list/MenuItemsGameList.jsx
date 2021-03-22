import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  DialogActions,
  Button,
  useTheme,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import { AddLocation, ToggleOff, ToggleOn } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function MenuItemsGameList() {
  const useStyles = makeStyles((theme) => ({
    registrationButton: {
      marginRight: 36,
    },
    registrationButtonHidden: {
      display: "none",
    },
    gameButton: {
      marginRight: 36,
    },
    gameButtonHidden: {
      display: "none",
    },
    customWidth: {
      maxWidth: 120,
    },
  }));
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="active games"
        title="Active Games"
      >
        <ListItem button>
          <ListItemIcon>
            <AddLocation />
          </ListItemIcon>
          <ListItemText primary="Active Games" />
        </ListItem>
      </Tooltip>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="upcoming games"
        title="Upcoming Games"
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Upcoming Games" />
        </ListItem>
      </Tooltip>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="completed games"
        title="Completed Games"
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Completed Games" />
        </ListItem>
      </Tooltip>
    </div>
  );
}
