import React from "react";
import { useState, useEffect } from "react";
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

const GameCardPopUp = ({ game, open, squadDatabase, setGameSquad }) => {
  const [openX, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  console.log(setGameSquad);

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
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
