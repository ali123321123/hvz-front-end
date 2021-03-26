import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TableCell } from "@material-ui/core";

export default function PlayerStats({ game }) {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });

  // const [timeDifferenceSeconds, setTimeDifferenceSeconds] = useState();
  // const [timeDifferenceMinutes, setTimeDifferenceMinutes] = useState();
  // const [timeDifferenceHours, setTimeDifferenceHours] = useState();

  console.log(game);

  const currentDate = new Date();

  const startTime = new Date(game.startTime);
  const endTime = new Date(game.endTime);

  startTime.getTime();
  console.log(startTime.getHours());

  const timeDifferenceSeconds = Math.abs(
    endTime.getTime() - startTime.getTime()
  ); //seconds
  const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60000);
  const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
  console.log("time diff in seconds", timeDifferenceSeconds);
  console.log("time diff in minutes", timeDifferenceMinutes);
  console.log("time diff in hours", timeDifferenceHours);

  // if (currentDate > endDate) {
  //   setHoursPlayed(currentDate - startDate);
  // if larger than...display weeks
  // }

  console.log(currentDate);

  const classes = useStyles();
  const moment = require("moment");

  return (
    <>
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
