import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
  MuiThemeProvider,
  ThemeProvider,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { themeActive } from "../shared/themeGameCards";

export default function MenuDrawer({ open, setOpen, menuItems }) {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },

    //keep right padding when drawer closed
    toolbar: {
      paddingRight: 24,
    },

    appBar: {
      //Keep appbar on top
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    //Shift appbar right the same amount as drawer width
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
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
      {/* Drawer Side menu  */}
      <Drawer
        variant="temporary"
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

        <List>{menuItems}</List>
      </Drawer>
      {/* Side menu End  */}
    </div>
  );
}
