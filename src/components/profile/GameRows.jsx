import { React } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function GameRows({players}) {
    
  const moment = require("moment");

  return (
    <>

      <Table size="normal">
        <TableHead>
          <TableRow>
            <TableCell>Game Name</TableCell>
            <TableCell>Squad Name</TableCell>
            <TableCell>Faction</TableCell>
            <TableCell>Kills</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players?.map((g) => (
            <TableRow key={g.id}>
              <TableCell>{g.game.name}</TableCell>
              <TableCell>
                {g.squad ? g.squad.name : `No registered squad`}
              </TableCell>
              <TableCell>{g.isHuman ? `Human` : g.isPatientZero ? `Patient Zero` : `Zombie`}</TableCell>
              <TableCell>{g.killerKills.length}</TableCell>
              <TableCell>{moment(`${g.game.startTime}`).format("DD-MM-YY")} to {moment(`${g.game.endTime}`).format("DD-MM-YY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
