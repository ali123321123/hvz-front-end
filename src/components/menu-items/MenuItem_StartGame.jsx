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
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";

const MenuItem_StartGame = ({ game }) => {
  //Text constants for Buttons and Dialog
  const gameStart = "Start Game";
  const gameEnd = "End Game";

  //Dialog PopUp
  const [openPopUp, setopenPopUp] = useState(false);

  //Set game and registration state
  const [gameState, setGameState] = useState();
  const [registrationState, setRegistrationState] = useState();

  const [name, setName] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [gameStarted, setGameStarted] = useState();
  const [gameComplete, setGameComplete] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const startGame = () => {
    fetch(`${Endpoints.GAME_API}/${game.id}/start_game`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json().then((res) => console.warn("result", res)));
  };

  const endGame = () => {
    fetch(`${Endpoints.GAME_API}/${game.id}/end_game`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json().then((res) => console.warn("result", res)));
  };

  //Open PopUp
  const handleClickOpenPopUp = () => {
    setopenPopUp(true);
  };

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setopenPopUp(false);
  };
  console.log(game.id);
  //Toggle GameState
  const handleGameState = () => {
    setopenPopUp(false); // close popup

    startGame();

    setGameState(
      gameState === game.gameStarted ? game.gameComplete : game.gameStarted
    );

    setRegistrationState(
      registrationState === game.registrationOpen
        ? !game.registrationOpen
        : game.registrationOpen
    );
  };
  const location = useLocation();

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
