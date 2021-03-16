import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

export default function PlayerStats() {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });

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
