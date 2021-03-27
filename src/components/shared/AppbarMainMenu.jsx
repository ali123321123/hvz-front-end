import React, { useEffect } from "react";
import { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router";
import Auth from "../../utils/authentication";
import { themeActive } from "../shared/themeGameCards";
import useSWR from "swr";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { fetcherToken } from "../../services/FetcherFunction";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage, decodedToken } from "../../utils/tokenHelper";
import MenuDrawer from "../menu-items/MenuDrawer";
import MenuIcon_ThemeToggle from "../menu-items/MenuIcon_ThemeToggle";

export default function AppbarMainMenu({ menuItems, menuTitle }) {
  const userToken = decodedToken();
  const history = useHistory();
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      width: "100%",
    },

    //keep right padding when drawer closed
    toolbar: {
      paddingRight: 24,
    },

    title: {
      flexGrow: 1,
    },

    appBar: {
      backgroundColor: "#CA1551",
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

    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  //Fetch game
  const { data: games, error: gamesError } = useSWR(
    `${Endpoints.GAME_API}`,
    (url) => fetcherToken(url, getTokenInStorage())
  );

  const handleToggleOpen = () => {
    setOpen(true);
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleRegisterClick = () => {
    history.push("/register");
  };

  const handleLogoutClick = () => {
    Auth.logoutUser();
  };

  return (
    <div className={classes.root}>
      {/* <ThemeProvider>
        <MuiThemeProvider theme={themeActive}>
          <CssBaseline /> */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        {/* Drawer Side menu  */}
        <MenuDrawer open={open} setOpen={setOpen} menuItems={menuItems} />
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          {/* TOGGLE THEME */}
          <MenuIcon_ThemeToggle />

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {menuTitle}
          </Typography>
          {!Auth.userIsLoggedIn() ? (
            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button onClick={handleRegisterClick}>Register</Button>
            </>
          ) : (
            <>
              <h3>{userToken.actort}</h3>
              <Button color="inherit" onClick={handleLogoutClick}>
                Log out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Side menu  */}
      <MenuDrawer
        open={open}
        setOpen={setOpen}
        menuItems={menuItems}
        games={games}
      />
      {/* </MuiThemeProvider>
      </ThemeProvider> */}
    </div>
  );
}
