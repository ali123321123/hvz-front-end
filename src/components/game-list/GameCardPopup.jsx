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
} from "@material-ui/core";
import Map from "../map/Map";
import "./CardStyles.scss"; // remove?
import { useHistory } from "react-router";
import GameCardPopupMap from "./GameCardPopupMap";
import "./CardStyles.scss";
import { useSelector } from "react-redux";
import Auth from "../../utils/authentication";

const GameCardPopUp = ({ game, open, setOpen }) => {
  const user = useSelector((state) => state.loggedInUser);
  const history = useHistory();

  const [playArea, setPlayArea] = useState(null);
  const [centerArea, setCenterArea] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinButton = () => {
    if (Auth.userIsLoggedIn()) {
      // need functionality to bake user join game and become player in that game.
      history.push(`/game/${game.id}`);
      return;
    }
    history.push({
      pathname: `/login`,
      state: game,
    });
  };

  const handleGameDashboardButton = () => {
      history.push({
          pathname: `admin/game/${game.id}`,
          state: game 
      })
  }

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
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {game.name}
        </DialogTitle>
        {playArea && centerArea ? (
          <div className="mapid">
            <GameCardPopupMap
              gameName={game.name}
              playAreaCoordinates={playArea}
              centerAreaCoordinates={centerArea}
            />
          </div>
        ) : null}

        <DialogContent dividers>
          {centerArea && (
            <Typography gutterBottom>
              Latitude: {centerArea[0].toFixed(2)} Longitude:{" "}
              {centerArea[1].toFixed(2)}
            </Typography>
          )}

          <Typography gutterBottom>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum,
            eligendi? Qui tenetur aut reiciendis dolorum laborum magnam minima
            nisi, ducimus quis earum atque ipsam commodi temporibus doloribus,
            quod exercitationem excepturi.
          </Typography>
          {Auth.userIsAdmin() ? (
            <Button
              variant="outlined"
              onClick={handleGameDashboardButton}
              color="primary"
            >
              Game dashboard
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleJoinButton}
              color="primary"
            >
              Join Game
            </Button>
          )}
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
