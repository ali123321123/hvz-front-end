import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TableCell } from "@material-ui/core";

export default function UserStats({ user, players }) {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });
  const [totalKills, setTotalKills] = useState(0);
  useEffect(() => {
    if (players?.killerKills) {
      const kills = players.reduce( (acc, p) => acc + p.killerKills.reduce((acc2, k) => acc2 + k));
      setTotalKills(kills)
    }
  }, [players]);
  const classes = useStyles();
  return (
    <>
      <TableCell>
        <Typography component="p" variant="h4">
          {user.username}
        </Typography>
      </TableCell>
      <Typography component="p" variant="h4">
        {players?.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Registered games
      </Typography>
      <Typography component="p" variant="h4">
        {totalKills}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Registered kills
      </Typography>
      <Typography component="p" variant="h4">
        4 / 12
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Missions completed
      </Typography>
    </>
  );
}
