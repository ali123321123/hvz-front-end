import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Game Data
function createData(id, date, name, player, bitCode, squad) {
  return { id, date, name, player, bitCode, squad };
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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function GameStats() {
  const classes = useStyles();
  return (
    <>
      <Title>Game Stats</Title>
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
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.date}</TableCell>
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
