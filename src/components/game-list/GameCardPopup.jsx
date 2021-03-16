import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const GameCardPopUp = ({ game, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {game.name}
        </DialogTitle>
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
