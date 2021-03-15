import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PlayArrow from "@material-ui/icons/PlayArrow";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import { AddLocation, ToggleOff, ToggleOn } from "@material-ui/icons";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ToggleOn />
      </ListItemIcon>
      <ListItemText primary="Start Game" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ToggleOn />
      </ListItemIcon>
      <ListItemText primary="Open Registration" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <AddLocation />
      </ListItemIcon>
      <ListItemText primary="Add Mission" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Players" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Games" />
    </ListItem>
  </div>
);
