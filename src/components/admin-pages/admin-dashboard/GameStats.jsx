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
import { useSelector } from "react-redux";
import Title from "./Title";
import { Paper, TableContainer, TablePagination } from "@material-ui/core";

export default function GameStats({ game }) {
  const user = useSelector((state) => state.loggedInUser);

  //Fech players
  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  //Fech Squad
  const {
    data: squads,
    error: squadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (players) {
      players.forEach(
        (p) =>
          (p.squad = squads.find((s) =>
            s.squadMembers.some((sm) => sm.playerId == p.id)
          ))
      );
    }
  }, []);

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
      <Paper>
        <TableContainer>
          <Title>Game info </Title>

          <Table size="small" stickyHeader aria-label="player-info">
            <TableHead>
              <TableRow>
                <TableCell>Player Name</TableCell>
                <TableCell>Player Type</TableCell>
                <TableCell>Bite Code</TableCell>
                <TableCell>Squad Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>
                      {p.isHuman
                        ? `Human`
                        : p.isPatientZero
                        ? `Patient Zero`
                        : `Zombie`}
                    </TableCell>
                    <TableCell>{p.biteCode}</TableCell>
                    <TableCell>
                      {p.squadName ? p.squadName : `No Squad`}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={players?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
