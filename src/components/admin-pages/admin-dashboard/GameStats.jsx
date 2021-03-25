import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Moment from "moment";
import useSWR from "swr";
import { fetcher, fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../../utils/tokenHelper";

import Title from "./Title";

// Generate Game Data
function createData(id, date, name, player, biteCode, squad) {
  return { id, date, name, player, biteCode, squad };
}
const rows = [
  createData(0, "16 Mar, 2019", "Player 0", "Human", "V!gx37&19", "None"),
  createData(1, "16 Mar, 2019", "Player 1", "Zombie", "V!gx37&19", "None"),
  createData(
    2,
    "16 Mar, 2019",
    "Player 2",
    "Human",
    "V!gx37&19",
    "Squad Group X"
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Player 3",
    "Human",
    "V!gx37&19",
    "Squad Group X"
  ),
  createData(4, "15 Mar, 2019", "Player 5", "Zombie", "V!gx37&19", "None"),
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function GameStats({ game }) {
  const moment = require("moment");
  const classes = useStyles();

  const [humanPlayers, setHumanPlayers] = useState([]);
  const [zombiePlayers, setZombiePlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const { hoursPlayed, setHoursPlayed } = useState();

  const startDate = game.startTime;
  const currentDate = new Date();
  const endDate = game.endTime;

  const startTime = new Date(startDate);
  startTime.getTime();
  console.log(startTime.getHours());

  const date = new Date("Thur Mar 25 2021 10:00:00");
  console.log(date.getHours());
  console.log(date.setHours(date.getHours() - 5));
  console.log(date.setMinutes(date.getMinutes() - 30));

  const timeDiff = Math.abs(currentDate.getTime() - startTime.getTime());
  var minutes = Math.floor(timeDiff / 60000);
  var seconds = ((timeDiff % 60000) / 1000).toFixed(0);

  // if (currentDate > endDate) {
  //   setHoursPlayed(currentDate - startDate);
  // }
  console.log("time diff", timeDiff);
  console.log(seconds, "seconds");
  console.log(minutes, "min");
  console.log(startTime);
  console.log(game.startTime);
  console.log(currentDate);

  const user = useSelector((state) => state.loggedInUser);

  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (players) {
      console.log("players", players);
      setHumanPlayers(players.filter((p) => p.isHuman));
      setZombiePlayers(players.filter((p) => !p.isHuman));
      setPlayer(players.filter((p) => p.userId === user.id));
    }
  }, [players]);

  return (
    <>
      <Title>Game Stats {game.name}</Title>
      <h3>Humans: {humanPlayers.length}</h3>
      <h3>Zombies: {zombiePlayers.length}</h3>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Player Name</TableCell>
            <TableCell>Player Type</TableCell>
            <TableCell>Bite Code</TableCell>
            <TableCell>Squad Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>
                {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.player}</TableCell>
              <TableCell>{row.biteCode}</TableCell>
              <TableCell>{row.squad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
