import { React, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
  ThemeProvider,
  ClickAwayListener,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Switch,
} from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { themeActive, light } from "../shared/themeGameCards";
import MenuIcon from "./MenuIcon";
import { Route, useHistory } from "react-router";
import { HomeRounded } from "@material-ui/icons";
import Auth from "../../utils/authentication";

export default function MenuDrawer({ open, setOpen, menuItems }) {
  const drawerWidth = 240;
  const history = useHistory();

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

  const [theme, setTheme] = useState(true);
  const [checked, setChecked] = useState(true);

  const handleColorTheme = () => {
    setTheme((t) => !t);
    setChecked((c) => !c);
    console.log("switched ");
  };

  const handleClickHome = () => {
    if (Auth.userIsLoggedIn()) {
      history.push("/");
    }
    if (Auth.userIsAdmin()) {
      history.push("/admin");
    }
  };

  const handleToggleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* TOGGLE THEME */}
      <MuiThemeProvider theme={theme ? themeActive : light}>
        <CssBaseline />
      </MuiThemeProvider>

      <div className={classes.root}>
        {/* Drawer Side menu  */}
        <Drawer
          onEscapeKeyDown={handleToggleClose}
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

          <List>
            {" "}
            <Tooltip
              arrow
              placement={"bottom"}
              aria-label="toggle theme"
              title="Toggle Theme"
            >
              <ListItem button>
                <ListItemIcon>
                  <Switch checked={checked} onChange={handleColorTheme} />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
              </ListItem>
            </Tooltip>
            {/* BTN: HOME */}
            <MenuIcon
              menuIcon={<HomeRounded />}
              title={"Home "}
              onClick={handleClickHome}
            />
            <Divider />
            {menuItems}
          </List>
        </Drawer>
        {/* Side menu End  */}
      </div>
    </>
  );
}
