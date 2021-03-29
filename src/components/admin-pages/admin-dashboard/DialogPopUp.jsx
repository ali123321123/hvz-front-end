import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

const DialogPopUp = ({
  dialogTitle,
  dialogText,
  handleClosePopUp,
  handleGameState,
  setopenPopUp,
}) => {
  return (
    <div>
      <Dialog
        open={setopenPopUp}
        onClose={handleClosePopUp}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" color="primary">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="primary">{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleClosePopUp}>
            No
          </Button>
          <Button color="primary" autoFocus onClick={handleGameState}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogPopUp;
