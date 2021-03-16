import React from "react";
import { useState, useEffect } from "react";
import {Marker, Popup, Rectangle } from "react-leaflet";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  Button,
  ThemeProvider,
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Map from "../map/Map";
import "./GameCard.scss";


const GameCardPopUp = ({ game, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const playArea = [
    [game.nW_lat, game.nW_lng],
    [game.sE_lat, game.sE_lng],
  ]

  const x = (game.nW_lat + game.sE_lat) / 2
  const y = (game.nW_lng + game.sE_lng) / 2
  console.log(x,y);

  const centerArea = [
      x,y
  ]

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {game.name}
        </DialogTitle>

        <div className="mapid">
          <Map center={centerArea} zoomBounds={playArea}>
              <Rectangle bounds={playArea} />
            <Marker position={centerArea}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
        </div>

        <DialogContent dividers>
          <Typography gutterBottom>Latitude: Longitude:</Typography>

          <Typography gutterBottom>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum,
            eligendi? Qui tenetur aut reiciendis dolorum laborum magnam minima
            nisi, ducimus quis earum atque ipsam commodi temporibus doloribus,
            quod exercitationem excepturi.
          </Typography>
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
