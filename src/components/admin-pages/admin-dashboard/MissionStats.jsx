import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

export default function MissionStats() {
  // Generate Mission Data
  function createData(id, date, name) {
    return { id, date, name };
  }

  const rows = [
    createData(0, "16 Mar, 2019", "Mission 0"),
    createData(1, "16 Mar, 2019", "Mission 1"),
    createData(2, "16 Mar, 2019", "Mission 2"),
    createData(3, "16 Mar, 2019", "Mission 3"),
    createData(4, "15 Mar, 2019", "Mission 5"),
  ];

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Title>Missions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mission</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
