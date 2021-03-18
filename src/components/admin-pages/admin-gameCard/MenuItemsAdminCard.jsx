import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import {
  AddLocation,
  Lock,
  PlayCircleOutline,
  ToggleOff,
} from "@material-ui/icons";

export default function MenuItemsAdminCard() {
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

  return (
    <div>
      <article>
        <ListItem button disabled aria-label="start game">
          <ListItemIcon>
            <PlayCircleOutline />
          </ListItemIcon>
          <ListItemText primary="Start Game" />
        </ListItem>
      </article>

      <article>
        <ListItem button disabled aria-label="open registration">
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Open Registration" />
        </ListItem>

        <ListItem button aria-label="close registration">
          <ListItemIcon>
            <ToggleOff />
          </ListItemIcon>
          <ListItemText primary="Close Registration" />
        </ListItem>
      </article>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="add"
        title="Pick a Game Card to Edit Missions"
      >
        <ListItem button>
          <ListItemIcon>
            <AddLocation />
          </ListItemIcon>
          <ListItemText primary="Add Mission" />
        </ListItem>
      </Tooltip>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="add"
        title="Pick a Game Card to Edit Players"
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Players" />
        </ListItem>
      </Tooltip>

      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </ListItem>
    </div>
  );
}
