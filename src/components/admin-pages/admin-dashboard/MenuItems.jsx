import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import { AddLocation, ToggleOff, ToggleOn } from "@material-ui/icons";

const MenuItems = () => {
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
  }));
  const classes = useStyles();

  const [startGame, setStartGame] = useState(true);
  const [openRegistration, setOpenRegistration] = useState(true);

  const handleGameStart = () => {
    setStartGame(true);
  };

  const handleGameEnd = () => {
    setStartGame(false);
  };

  const handleRegistrationleOpen = () => {
    setOpenRegistration(true);
  };

  const handleRegistrationToggleClose = () => {
    setOpenRegistration(false);
  };

  return (
    <div>
      <article>
        <ListItem
          button
          aria-label="start game"
          onClick={handleGameEnd}
          className={clsx(
            classes.gameButton,
            !startGame && classes.gameButtonHidden
          )}
        >
          <ListItemIcon>
            <ToggleOn />
          </ListItemIcon>
          <ListItemText primary="Start Game" />
        </ListItem>

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
      </article>

      <article>
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
      </article>

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
};

export default MenuItems;
