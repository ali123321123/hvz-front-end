import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Lock, LockOpen } from "@material-ui/icons";
import DialogPopUp from "../admin-pages/admin-dashboard/DialogPopUp";
import { useLocation } from "react-router-dom";

const MenuItem_OpenRegistration = ({ disabled }) => {
  const useStyles = makeStyles((theme) => ({
    customWidth: {
      maxWidth: 120,
    },
  }));
  const classes = useStyles();

  //Text constants for Buttons and Dialog
  const registrationOpen = "Open Registration";
  const registrationClose = "Close Registration";

  //Dialog PopUp
  const [openRegistrationPopUp, setOpenRegistrationPopUp] = useState(false);

  //Set game and registration state
  const [game, setGame] = useState({});
  const [gameState, setGameState] = useState();

  const handleClickOpenPopUp = () => {
    setOpenRegistrationPopUp(true);
  };

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setOpenRegistrationPopUp(false);
  };

  //Toggle Registration State
  const handleRegistrationState = () => {
    setOpenRegistrationPopUp(false);
    setGameState(
      gameState === game.registrationOpen
        ? !game.registrationOpen
        : game.registrationOpen
    );
  };

  const location = useLocation();

  useEffect(() => {
    setGame(location.state);
  }, [location.state]);

  return (
    <div>
      {/* DIALOG: START | END GAME */}
      <article>
        {openRegistrationPopUp && (
          <DialogPopUp
            dialogTitle={game.name}
            dialogText={
              gameState
                ? `Would you like to ${registrationOpen}`
                : `Would you like to ${registrationClose} ?`
            }
            setopenPopUp={setOpenRegistrationPopUp}
            handleClosePopUp={handleClosePopUp}
            handleGameState={handleRegistrationState}
          />
        )}
      </article>

      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label={
            gameState ? `${"open registration"}` : `${"close registration"}`
          }
          title={
            gameState
              ? `${"Registration is Closed"}`
              : `${"Registration is Open"}`
          }
        >
          <ListItem
            disabled={disabled}
            button
            onClick={handleClickOpenPopUp}
            aria-label="start game"
          >
            <ListItemIcon>{gameState ? <Lock /> : <LockOpen />}</ListItemIcon>
            <ListItemText
              primary={
                gameState ? `${registrationOpen}` : `${registrationClose}`
              }
            />
          </ListItem>
        </Tooltip>
      </article>
    </div>
  );
};

export default MenuItem_OpenRegistration;
