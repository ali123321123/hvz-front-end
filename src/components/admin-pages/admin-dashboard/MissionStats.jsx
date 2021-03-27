import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { Paper, TableContainer, TablePagination } from "@material-ui/core";

export default function MissionStats() {
  const moment = require("moment");

  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.MISSION_API}`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Title stickyHeader>Missions</Title>
          <Table stickyHeader aria-label="mission-stats">
            <TableHead>
              <TableRow>
                <TableCell>Mission</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Mission for:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missions
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((m) => (
                  <TableRow key={m.id} hover role="checkbox">
                    <TableCell>{m.name}</TableCell>
                    <TableCell>
                      {moment(`${m.startTime}`).format("MMMM Do YYYY, HH:mm ")}
                    </TableCell>
                    <TableCell>
                      {moment(`${m.endTime}`).format("MMMM Do YYYY, HH:mm ")}
                    </TableCell>
                    <TableCell>
                      {m.isHumanVisible ? `Human` : `Zombie`}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={missions?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
