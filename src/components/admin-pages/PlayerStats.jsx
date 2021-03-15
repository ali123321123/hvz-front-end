import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function PlayerStats() {
  const classes = useStyles();
  return (
    <>
      <Title>Player stats</Title>
      <Typography component="p" variant="h4">
        4 hours 38 sec
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        since game started
      </Typography>
      <Typography component="p" variant="h4">
        46
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Players
      </Typography>
      <Typography component="p" variant="h4">
        12 34
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Humans Zombies
      </Typography>
    </>
  );
}
