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
import { useLocation } from "react-router-dom";

const MenuItem_StartGame = () => {
  //Text constants for Buttons and Dialog
  const gameStart = "Start Game";
  const gameEnd = "End Game";

  //Dialog PopUp
  const [openPopUp, setopenPopUp] = useState(false);

  //Set game and registration state
  const [game, setGame] = useState({});
  const [gameState, setGameState] = useState();
  const [registrationState, setRegistrationState] = useState();

  //Open PopUp
  const handleClickOpenPopUp = () => {
    setopenPopUp(true);
  };

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setopenPopUp(false);
  };

  //Toggle GameState
  const handleGameState = () => {
    setopenPopUp(false); // close popup
    setGameState(
      gameState === game.gameStarted ? !game.gameStarted : game.gameStarted
    );
    setRegistrationState(
      registrationState === game.registrationOpen
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
        {openPopUp && (
          <DialogPopUp
            dialogTitle={game.name}
            dialogText={
              !game.gameStarted
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
            !gameState ? `${"game has not started"}` : `${"end game"}`
          }
          title={
            !game.gameStarted ? `${"Game has not started"}` : `${"End game"}`
          }
        >
          <ListItem
            disabled={game.gameComplete ? true : false}
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
