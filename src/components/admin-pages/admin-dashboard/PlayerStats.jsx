import { React, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { TableCell, TableContainer } from "@material-ui/core";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";

export default function PlayerStats({ game }) {
  //TODO! CLEAN AND MOVE CODE BLOCK CALCULATIONS OUT TO COMPONENT

  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const [humanPlayers, setHumanPlayers] = useState(0);
  const [zombiePlayers, setZombiePlayers] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    if (players) {
      setHumanPlayers(players.filter((h) => h.isHuman).length);
      if (players && players.length > 0) {
        setZombiePlayers(players.length - humanPlayers);

        setTotalPlayers(humanPlayers + zombiePlayers);
      }
    }
  }, [players]);

  const currentDate = new Date();
  const startTime = new Date(game.startTime);
  const endTime = new Date(game.endTime);

  const timeDifferenceSeconds = Math.abs(
    currentDate.getTime() - startTime.getTime()
  );
  const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60000);
  const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);

  //TODO
  // if (currentDate > endDate) {
  //   setHoursPlayed(currentDate - startDate);
  // if larger than...display weeks
  // }

  const moment = require("moment");

  return (
    <>
      <TableContainer style={{ textAlign: "center" }}>
        <TableCell>
          {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
        </TableCell>
        <TableCell>
          {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
        </TableCell>

        <Typography variant="h4" style={{ marginTop: "10px" }}>
          {timeDifferenceMinutes} minutes
        </Typography>
        <Typography color="textPrimary">since game started</Typography>

        <Typography variant="h4" style={{ marginTop: "10px" }}>
          {totalPlayers}
        </Typography>
        <Typography color="textPrimary" style={{ marginTop: "10px" }}>
          Players
        </Typography>

        <Typography component="p" variant="h4" style={{ marginTop: "10px" }}>
          <span style={{ marginTop: "10px" }}>{humanPlayers}</span>
          &nbsp; &nbsp;
          <span style={{ marginTop: "10px" }}>{zombiePlayers}</span>
        </Typography>

        <Typography color="textPrimary">
          Humans &nbsp; &nbsp; Zombies
        </Typography>
      </TableContainer>
    </>
  );
}
