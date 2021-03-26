import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import {
  AddLocation,
  Delete,
  HighlightOff,
  Lock,
  LockOpen,
  PlayCircleOutline,
  PostAdd,
} from "@material-ui/icons";
import DialogPopUp from "../admin-pages/admin-dashboard/DialogPopUp";

const MenuItem_OpenRegistration = () => {
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
  const [openPopUp, setopenPopUp] = useState(false);
  const [openRegistrationPopUp, setOpenRegistrationPopUp] = useState(false);

  //Set game and registration state
  const [gameState, setGameState] = useState(true);
  const [registrationState, setRegistrationState] = useState(true);

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setopenPopUp(false);
    setOpenRegistrationPopUp(false);
  };

  const handleClickOpenRegistrationPopUp = () => {
    setOpenRegistrationPopUp(true);
  };

  //Toggle Registration State
  const handleRegistrationState = () => {
    setOpenRegistrationPopUp(false); // close popup
    setRegistrationState(registrationState === true ? false : true);
  };

  return (
    <div>
      {/* DIALOG: OPEN REGISTRATION */}
      <article>
        {openRegistrationPopUp && (
          <DialogPopUp
            dialogTitle={"game name"}
            dialogText={
              registrationState
                ? `Would you like to ${registrationOpen}`
                : `Would you like to ${registrationClose} ?`
            }
            setopenPopUp={setOpenRegistrationPopUp}
            handleClosePopUp={handleClosePopUp}
            handleGameState={handleRegistrationState}
          />
        )}
      </article>

      {/* BTN: REGISTRATION */}
      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label={
            registrationState
              ? `${"open registration"}`
              : `${"close registration"}`
          }
          title={
            registrationState
              ? `${"Registration is Closed"}`
              : `${"Registration is Open"}`
          }
        >
          <ListItem
            disabled={gameState ? false : true}
            button
            onClick={handleClickOpenRegistrationPopUp}
            aria-label={
              registrationState ? `${registrationOpen}` : `${registrationClose}`
            }
          >
            <ListItemIcon>
              {registrationState ? (
                <Lock />
              ) : !registrationState && !gameState ? (
                <Lock />
              ) : (
                <LockOpen />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                registrationState && gameState
                  ? `${registrationOpen}`
                  : !gameState
                  ? `${"Registration is Closed"}`
                  : `${registrationClose}`
              }
            />
          </ListItem>
        </Tooltip>
      </article>
    </div>
  );
};

export default MenuItem_OpenRegistration;
