import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { useSelector } from "react-redux";
import Title from "./Title";
import { TableContainer, TablePagination } from "@material-ui/core";

export default function GameStats({ game }) {
  // const user = useSelector((state) => state.loggedInUser);

  const noSquad = "No Squad";
  const patientZero = "Patient Zero";

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
      <TableContainer>
        <Title>Game info </Title>

        <Table size="small" stickyHeader aria-label="player-info">
          <TableHead>
            <TableRow color="primary">
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
                  <TableCell color="primary">{p.name}</TableCell>
                  <TableCell color="primary">
                    {p.isHuman ? (
                      <Typography variant="body2" style={{ color: "#3bbb4c" }}>
                        Human
                      </Typography>
                    ) : p.isPatientZero ? (
                      <Typography
                        variant="body2"
                        style={{
                          color: "#df1b55",

                          fontStyle: "italic",
                        }}
                      >
                        {patientZero}
                      </Typography>
                    ) : (
                      <Typography variant="body2" style={{ color: "#df1b55" }}>
                        Zombie
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{p.biteCode}</TableCell>
                  <TableCell>
                    {p.squadName ? (
                      p.squadName
                    ) : (
                      <Typography
                        variant="body2"
                        color="secondary"
                        style={{ fontStyle: "italic" }}
                      >
                        {noSquad}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage=""
        component="div"
        count={players?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
