import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { TableCell } from "@material-ui/core";
import Moment from "moment";

export default function PlayerStats({ game }) {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });

  const classes = useStyles();
  const moment = require("moment");

  return (
    <>
      {/* <Title>Game stats</Title> */}

      <TableCell>
        {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
      </TableCell>
      <TableCell>
        {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
      </TableCell>

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
