import React from "react";
import { useState, useEffect } from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router";
import GameCardPopupMap from "./GameCardPopupMap";
import "./CardStyles.scss";
import Auth from "../../utils/authentication";
import { decodedToken, getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import "../shared/Leaflet.scss";
import PlayerStats from "../admin-pages/admin-dashboard/PlayerStats";
import CalculateTime from "../admin-pages/admin-dashboard/CalculateTime";

const GameCardPopUp = ({ game, open, setOpen }) => {
  // const user = useSelector((state) => state.loggedInUser);
  const history = useHistory();

  const [playArea, setPlayArea] = useState(null);
  const [centerArea, setCenterArea] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinButton = () => {
    if (Auth.userIsLoggedIn()) {
      let data = {
        userId: decodedToken().unique_name,
        gameId: game.id,
      };
      fetch(`${Endpoints.GAME_API}/${game.id}/join_game`, {
        method: "Post",
        headers: {
          Authorization: "Bearer " + getTokenInStorage(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) =>
        res.json().then((res) => {
          console.warn("result", res);
        })
      );
      history.push(`/game/${game.id}`);
      return;
    }
    history.push({
      pathname: `/login`,
      state: game,
    });
  };

  useEffect(() => {
    setPlayArea([
      [game.nW_lat, game.nW_lng],
      [game.sE_lat, game.sE_lng],
    ]);
  }, [game]);

  useEffect(() => {
    const x = (game.nW_lat + game.sE_lat) / 2;
    const y = (game.nW_lng + game.sE_lng) / 2;
    console.log(x, y);
    setCenterArea([x, y]);
  }, [game]);

  return (
    <div>
      <Dialog aria-labelledby="join-game-popup" open={open} fullWidth>
        <DialogTitle id="join-game-popup" onClose={handleClose}>
          {game.name}
        </DialogTitle>

        <DialogContent>
          <CalculateTime game={game} />
        </DialogContent>

        <DialogContent>
          {playArea && centerArea ? (
            <GameCardPopupMap
              gameName={game.name}
              playAreaCoordinates={playArea}
              centerAreaCoordinates={centerArea}
              scrollWheelZoom={false}
            />
          ) : null}
        </DialogContent>

        <DialogContent dividers>
          {centerArea && (
            <Typography gutterBottom>
              Latitude: {centerArea[0].toFixed(2)} Longitude:{" "}
              {centerArea[1].toFixed(2)}
            </Typography>
          )}

          <Typography gutterBottom>{game.description}</Typography>

          <Button variant="outlined" onClick={handleJoinButton} color="primary">
            Join Game
          </Button>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CLose
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default GameCardPopUp;
