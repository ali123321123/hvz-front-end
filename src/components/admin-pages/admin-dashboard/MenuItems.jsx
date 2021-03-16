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

export default function MenuItems() {
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

  const [startGame, setStartGame] = useState(true);
  const [openRegistration, setOpenRegistration] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGameStart = () => {
    setStartGame(true);
  };

  const handleRegistrationleOpen = () => {
    setOpenRegistration(true);
  };

  const handleRegistrationToggleClose = () => {
    setOpenRegistration(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    setOpen(false);
    if (setStartGame(false)) {
      setStartGame(true);
    } else {
      setStartGame(false);
    }
  };

  const handleClose = () => {
    setOpen(false);

    setStartGame(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to start the game + game name?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={handleClose}
            className={clsx(
              classes.gameButton,
              !startGame && classes.gameButtonHidden
            )}
          >
            No
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={handleAgree}
            className={clsx(
              classes.gameButton,
              !startGame && classes.gameButtonHidden
            )}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="game has not started"
          title="Game has not started"
        >
          <ListItem button onClick={handleClickOpen} aria-label="start game">
            <ListItemIcon>
              <ToggleOn />
            </ListItemIcon>
            <ListItemText primary="Start Game" />
          </ListItem>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="end game"
          title="End game"
        >
          <ListItem
            button
            aria-label="end game"
            onClick={handleGameStart}
            className={clsx(
              classes.gameButton,
              startGame && classes.gameButtonHidden
            )}
            open={startGame}
          >
            <ListItemIcon>
              <ToggleOff />
            </ListItemIcon>
            <ListItemText primary="End Game" />
          </ListItem>
        </Tooltip>
      </article>

      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="registration open"
          title="Registration is closed"
        >
          <ListItem
            button
            aria-label="open registration"
            onClick={handleRegistrationToggleClose}
            className={clsx(
              classes.registrationButton,
              !openRegistration && classes.registrationButtonHidden
            )}
          >
            <ListItemIcon>
              <ToggleOn />
            </ListItemIcon>
            <ListItemText primary="Open Registration" />
          </ListItem>
        </Tooltip>

        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="registration open"
          title="Registration is open"
        >
          <ListItem
            button
            aria-label="close registration"
            onClick={handleRegistrationleOpen}
            className={clsx(
              classes.registrationButton,
              openRegistration && classes.registrationButtonHidden
            )}
            open={openRegistration}
          >
            <ListItemIcon>
              <ToggleOff />
            </ListItemIcon>
            <ListItemText primary="Close Registration" />
          </ListItem>
        </Tooltip>
      </article>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="add mission"
        title="Add Mission"
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
        aria-label="edit players"
        title="Edit Players"
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Players" />
        </ListItem>
      </Tooltip>

      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        arrow
        placement={"bottom"}
        aria-label="edit games"
        title="Edit Games"
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Games" />
        </ListItem>
      </Tooltip>
    </div>
  );
}
