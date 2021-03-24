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
import LayersIcon from "@material-ui/icons/Layers";
import {
  AddLocation,
  HighlightOff,
  Lock,
  LockOpen,
  Photo,
  PlayCircleOutline,
  PostAdd,
} from "@material-ui/icons";
import DialogPopUp from "./DialogPopUp";
import UploadImages from "../../upload-images/UploadImages";
import useSWR from "swr";
import { fetcher } from "../../../services/FetcherFunction";
import { Cloudinary } from "cloudinary-core";
import { useHistory } from "react-router";

export default function MenuItemsAdminDashboard() {
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

  //Text constants for Buttons and Dialog
  const gameStart = "Start Game";
  const gameEnd = "End Game";
  const registrationOpen = "Open Registration";
  const registrationClose = "Close Registration";

  //Dialog PopUp
  const [openPopUp, setopenPopUp] = useState(false);
  const [openRegistrationPopUp, setOpenRegistrationPopUp] = useState(false);

  //Set game and registration state
  const [gameState, setGameState] = useState(true);
  const [registrationState, setRegistrationState] = useState(true);

  const [openForm, setOpenForm] = useState(false);

  const history = useHistory();

  //Open PopUp
  const handleClickOpenPopUp = () => {
    setopenPopUp(true);
  };
  const handleClickOpenRegistrationPopUp = () => {
    setOpenRegistrationPopUp(true);
  };

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setopenPopUp(false);
    setOpenRegistrationPopUp(false);
  };

  //Toggle GameState
  const handleGameState = () => {
    setopenPopUp(false); // close popup
    setGameState(gameState === true ? false : true);
  };

  //Toggle Registration State
  const handleRegistrationState = () => {
    setOpenRegistrationPopUp(false); // close popup
    setRegistrationState(registrationState === true ? false : true);
  };

  const { data: games, error: gamesError } = useSWR(
    "https://localhost:44390/api/games/4",
    fetcher
  );

  useEffect(() => {
    console.log(games);
  }, [games]);

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const handleOpenForm = () => {
    setOpenForm(openForm);
  };

  return (
    <div>
      {/* DIALOG: START | END GAME */}
      <article>
        {openPopUp && (
          <DialogPopUp
            dialogTitle={"game name"}
            dialogText={
              gameState
                ? `Would you like to ${gameStart}`
                : `Would you like to ${gameEnd} ?`
            }
            setopenPopUp={setopenPopUp}
            handleClosePopUp={handleClosePopUp}
            handleGameState={handleGameState}
          />
        )}
      </article>

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

      {/* BTN: START && END */}
      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label={gameState ? `${"game has not started"}` : `${"end game"}`}
          title={gameState ? `${"Game has not started"}` : `${"End game"}`}
        >
          <ListItem
            button
            onClick={handleClickOpenPopUp}
            aria-label={gameState ? `${gameStart}` : `${gameEnd}`}
          >
            <ListItemIcon>
              {gameState ? <PlayCircleOutline /> : <HighlightOff />}
            </ListItemIcon>
            <ListItemText primary={gameState ? `${gameStart}` : `${gameEnd}`} />
          </ListItem>
        </Tooltip>
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

      {/* BTN: ADD MISSION */}
      <article>
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
      </article>

      {/* BTN: ADD EDIT PLAYERS */}
      <article>
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
      </article>

      {/* CREATE NEW GAME */}
      <article>
        <Tooltip
          classes={{ tooltip: classes.customWidth }}
          arrow
          placement={"bottom"}
          aria-label="create game"
          title="Create new Game"
        >
          <ListItem button onClick={handleOpenForm}>
            <ListItemIcon>
              <PostAdd />
            </ListItemIcon>
            <ListItemText primary="Create new Game" />
          </ListItem>
        </Tooltip>
      </article>

      {/* OPEN LINK TO ADMIN FORM */}
    </div>
  );
}
