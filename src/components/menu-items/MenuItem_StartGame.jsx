import React from "react";
import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { HighlightOff, PlayCircleOutline } from "@material-ui/icons";
import DialogPopUp from "../admin-pages/admin-dashboard/DialogPopUp";

const MenuItem_StartGame = () => {
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
          aria-label={gameState ? `${"game has not started"}` : `${"end game"}`}
          title={gameState ? `${"Game has not started"}` : `${"End game"}`}
        >
          <ListItem
            button
            onClick={handleClickOpenPopUp}
            aria-label="start game"
          >
            <ListItemIcon>
              {gameState ? <PlayCircleOutline /> : <HighlightOff />}
            </ListItemIcon>
            <ListItemText primary={gameState ? `${gameStart}` : `${gameEnd}`} />
          </ListItem>
        </Tooltip>
      </article>
    </div>
  );
};

export default MenuItem_StartGame;
