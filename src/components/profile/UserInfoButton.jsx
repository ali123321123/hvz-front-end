import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function UserInfoButton({ buttonText, adornment, clickEvent, ariaLabel }) {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });

  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      aria-label={ariaLabel}
      variant="extended"
      size="medium"
      onClick={clickEvent}
    >
      <>
        {buttonText}
        {adornment}
      </>
    </Fab>
  );
}
