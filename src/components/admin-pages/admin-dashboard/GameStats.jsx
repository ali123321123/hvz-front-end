import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import Title from "./Title";
import { TableContainer, TablePagination } from "@material-ui/core";
import GameStatsRow from "./GameStatsRow";

export default function GameStats({ game }) {
  const moment = require("moment");

  //Fetch players
  const {
    data: players,
    error: playersError,
  } = useSWR(
    `${Endpoints.GAME_API}/${game.id}/players`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 1 }
  );

  //Fech Squad
  const {
    data: squads,
    error: squadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //do not remove event atribute - will break
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Title>
          Game info |{" "}
          {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")} -{" "}
          {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
        </Title>

        <Table size="small" stickyHeader aria-label="player-info">
          <TableHead>
            <TableRow color="primary">
              <TableCell>Player Name</TableCell>
              <TableCell>Player Type</TableCell>
              <TableCell>Bite Code</TableCell>
              <TableCell>Squad Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p) => (
                <GameStatsRow p={p} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage=""
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
