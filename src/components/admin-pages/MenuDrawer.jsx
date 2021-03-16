import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuItems from "./admin-dashboard/MenuItems";

export default function MenuDrawer({ open, setOpen }) {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },

    //keep right padding when drawer closed
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },

    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },

    //Side Menu
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
  }));
  const classes = useStyles();

  const handleToggleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Drawer Side menu  */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleToggleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
          <MenuItems />
        </List>
      </Drawer>
      {/* Side menu End  */}
    </div>
  );
}
