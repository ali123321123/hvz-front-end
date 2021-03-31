import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AddLocation } from "@material-ui/icons";
import Title from "./Title";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import MissionStatsRow from "./MissionStatsRow";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import CreateMissionForm from "./CreateMissionForm";
import Fab from "@material-ui/core/Fab";
export default function EditMissionStats({ game }) {
  const moment = require("moment");

  const useStyles = makeStyles((theme) => ({
    root: {
      color: "black",
    },
    missionStatsHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();
  const theme = useTheme();

  const [activeMissions, setActiveMissions] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  //Fetch Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(
    `${Endpoints.GAME_API}/${game.id}/missions`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 100 }
  );

  useEffect(() => {
    if (missionsError) {
      console.log(missionsError);
    }
    console.log(missions);
  }, [missionsError]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openMission, setOpenMission] = useState(false);
  const handleClickOpenMission = () => {
    setOpenMission(true);
  };

  return (
    <>
      <TableContainer>
        <div className={classes.missionStatsHeader}>
          <Title stickyHeader>Missions</Title>
          <Fab
            color="secondary"
            aria-label="Add Mission button"
            variant="extended"
            size="medium"
            onClick={handleClickOpenMission}
          >
            <>
              Add Mission
              <AddLocation />
            </>
          </Fab>
        </div>
        {openMission && (
          <CreateMissionForm
            openMission={openMission}
            setOpenMission={setOpenMission}
            game={game}
          />
        )}
        <Table stickyHeader aria-label="mission-stats">
          <TableHead>
            <TableRow>
              <TableCell>Mission </TableCell>
              <TableCell>Start/End Date:</TableCell>
              <TableCell>Faction:</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
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
              .map((m) => (
                <MissionStatsRow mission={m} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        color="primary"
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
