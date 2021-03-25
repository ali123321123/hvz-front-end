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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuDrawer from "../admin-pages/admin-dashboard/MenuDrawer";
import { useHistory } from "react-router";
import Auth from "../../utils/authentication";
import { useSelector } from "react-redux";
import {decodedToken} from '../../utils/tokenHelper'

export default function AppbarMainMenu({ menuItems, menuTitle }) {
    
  const userToken = decodedToken()
  const history = useHistory();
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      width: "10%",
    },

    //keep right padding when drawer closed
    toolbar: {
      paddingRight: 24,
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

  const handleToggleOpen = () => {
    setOpen(true);
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleRegisterClick = () => {
      history.push("/register");
  }

  const handleLogoutClick = () => {
      Auth.logoutUser()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
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
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            {menuTitle}
          </Typography>
          {!Auth.userIsLoggedIn() ? (
            <div>
              <Button onClick={handleLoginClick}>Login</Button>
              <Button onClick={handleRegisterClick}>Register</Button>
            </div>
          ) : (
            <div>
              <h3>{userToken.actort}</h3>
              <Button onClick={handleLogoutClick}>Log out</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Side menu  */}
      <MenuDrawer open={open} setOpen={setOpen} menuItems={menuItems} />
    </div>
  );
}
