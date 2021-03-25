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

  return (
    <>
      <Title>Game Stats {game.name}</Title>
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
          {/* {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>
                {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.player}</TableCell>
              <TableCell>{player.biteCode}</TableCell>
              <TableCell>{player.squad}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}
