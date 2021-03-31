import { React, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  Checkbox,
  CssBaseline,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MuiThemeProvider,
  TextField,
  IconButton,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import Title from "./Title";
import { TableContainer, TablePagination } from "@material-ui/core";
import GameStatsRow from "./GameStatsRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { AddLocation } from "@material-ui/icons";

export default function GameStats({ game }) {
  const moment = require("moment");
  const useStyles = makeStyles((theme) => ({
    root: {
      color: "black",
    },
    gamesStatsHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
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

  const [openAddPlayer, setOpenAddPlayer] = useState(false);
  const handleClickOpenAddplayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

  const [userId, setUserId] = useState();
  const [addUserError, setAddUserError] = useState(false);
  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const addPlayer = () => {

    let data = {
        userId: userId,
        gameId: game.id,
      };
      fetch(`${Endpoints.GAME_API}/${game.id}/join_game`, {
        method: "Post",
        headers: {
          Authorization: "Bearer " + getTokenInStorage(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) =>
        res.json().then((res) => {
            if(res.message) setAddUserError(true)
            else handleClickOpenAddplayer()
          console.warn("result", res);
        })
      );
  }

  return (
    <>
      <TableContainer>
        <div className={classes.gamesStatsHeader}>
          <Title>
            Game info |{" "}
            {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")} -{" "}
            {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
          </Title>
          <Fab
            color="secondary"
            aria-label="Add Player button"
            variant="extended"
            size="medium"
            onClick={handleClickOpenAddplayer}
          >
            <>
              Add Player
              <AddLocation />
            </>
          </Fab>
        </div>

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
      {/* ADD PLAYER DIALOG */}
      <Dialog
            open={openAddPlayer}
            fullWidth
            onClose={handleClickOpenAddplayer}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogActions>
              <IconButton aria-label="close" onClick={handleClickOpenAddplayer}>
                <CloseIcon />
              </IconButton>
            </DialogActions>

            <DialogTitle>
              <Typography variant="h3">Add new Player</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <DialogContent>
                  <TextField
                    required
                    autoFocus
                    variant="outlined"
                    name="user id"
                    value={userId}
                    label="User Id"
                    style={{ padding: "10px"}}
                    onChange={handleUserId}
                  />
                </DialogContent>
                {/* BUTTON ADD PLAYER */}
                <section>
                  <DialogActions>
                    <Button
                      className="buttonPink"
                      color="primary"
                      type="button"
                      onClick={addPlayer}
                    >
                      Add player
                    </Button>
                  </DialogActions>
                  {addUserError && <p>Could not add user</p>}
                </section>
            </DialogContent>
          </Dialog>
    </>
  );
}
