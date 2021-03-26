import React from "react";
import { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { HighlightOff, PlayCircleOutline } from "@material-ui/icons";
import DialogPopUp from "../admin-pages/admin-dashboard/DialogPopUp";
import { useLocation, useHistory } from "react-router-dom";

const MenuItem_StartGame = (props) => {
  //Text constants for Buttons and Dialog
  const gameStart = "Start Game";
  const gameEnd = "End Game";

  //Dialog PopUp
  const [openPopUp, setopenPopUp] = useState(false);
  const [openRegistrationPopUp, setOpenRegistrationPopUp] = useState(false);

  //Set game and registration state
  const [gameState, setGameState] = useState(true);

  //Open PopUp
  const handleClickOpenPopUp = () => {
    setopenPopUp(true);
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
  const location = useLocation();
  const [game, setGame] = useState({});

  console.log(location.state);

  useEffect(() => {
    setGame(location.state);
  }, [location.state]);

  //if game not started
  const gameHasStarted = () => {
    if (game.started) {
      setGameState(true);
      console.log("startet", game);
    } else {
      setGameState(false);
    }
  };

  useEffect(() => {
    if (game.started) {
      setGameState(true);
      console.log("startet", game.gameStarted);
    } else {
      setGameState(false);
      console.log("startet", game.gameStarted);
    }
  }, []);

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

      <article>
        <Tooltip
          arrow
          placement={"bottom"}
          aria-label={
            !game.gameStarted ? `${"game has not started"}` : `${"end game"}`
          }
          title={
            !game.gameStarted ? `${"Game has not started"}` : `${"End game"}`
          }
        >
          <ListItem
            button
            onClick={handleClickOpenPopUp}
            aria-label="start game"
          >
            <ListItemIcon>
              {!game.gameStarted ? <PlayCircleOutline /> : <HighlightOff />}
            </ListItemIcon>
            <ListItemText
              primary={!game.gameStarted ? `${gameStart}` : `${gameEnd}`}
            />
          </ListItem>
        </Tooltip>
      </article>
    </div>
  );
};

export default MenuItem_StartGame;
