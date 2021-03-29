import { useState, useEffect } from "react";
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
import {
  Paper,
  TableContainer,
  TablePagination,
  Typography,
} from "@material-ui/core";

export default function MissionStats({ game }) {
  const moment = require("moment");

  const [activeMissions, setActiveMissions] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/missions`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (missionsError) {
      console.log(missionsError);
    }
    if (missions && game) {
      setActiveMissions(missions.filter((f) => f.gameID == game.id));
    }
  }, [missions, game]);

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
        <Title stickyHeader>Missions</Title>
        <Table stickyHeader aria-label="mission-stats">
          <TableHead>
            <TableRow>
              <TableCell>Mission </TableCell>
              <TableCell>Description </TableCell>
              <TableCell>Mission for:</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeMissions?.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
              </TableRow>
            ))}

            {missions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((f) => f.gameId == game.id)
              .map((m) => (
                <TableRow key={m.id} hover role="checkbox">
                  <TableCell>{m.name}</TableCell>

                  <TableCell>{m.description}</TableCell>

                  <TableCell>
                    {m.isHumanVisible ? (
                      <Typography
                        variant="body2"
                        style={{ color: "#3bbb4c", fontWeight: "bold" }}
                      >
                        Human
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        style={{ color: "#df1b55", fontWeight: "bold" }}
                      >
                        Zombie
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {moment(`${m.startTime}`).format("MMMM Do YYYY, HH:mm ")}
                  </TableCell>
                  <TableCell>
                    {moment(`${m.endTime}`).format("MMMM Do YYYY, HH:mm ")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        color="primary"
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage=""
        component="div"
        count={missions?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
