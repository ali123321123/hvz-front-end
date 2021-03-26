import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";

const MenuIcon = ({ title, menuIcon, onClick, disabled }) => {
  const useStyles = makeStyles((theme) => ({
    customWidth: {
      maxWidth: 120,
    },
  }));
  const classes = useStyles();
  return (
    <>
      {/* BTN: ADD MISSION */}
      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          disabled={disabled}
          arrow
          placement={"bottom"}
          aria-label={title}
          title={title}
        >
          <ListItem button onClick={onClick}>
            <ListItemIcon>{menuIcon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </Tooltip>
      </article>
    </>
  );
};

export default MenuIcon;
