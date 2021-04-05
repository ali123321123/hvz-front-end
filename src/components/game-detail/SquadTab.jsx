import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage } from "../../utils/tokenHelper";
import { makeStyles, Typography, Fab, Grid } from "@material-ui/core";
import Title from "../admin-pages/admin-dashboard/Title";
import AccordionRowSquads from "./AccordionRowSquads";
import { AddLocation } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export default function SquadTab({ player, gameId }) {
  const history = useHistory();
  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {},
    squadTitle: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      width: "90%",
      margin: "auto",
    },
  }));
  const classes = useStyles();
  const moment = require("moment");

  const {
    data: squads,
    error: squadsError,
  } = useSWR(
    `${Endpoints.GAME_API}/${gameId}/squads`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 10 }
  );

  const handleCheckinSquadClick = () => {postCheckinSquad()};

  const postCheckinSquad = () => {
    let data = {
      gameId: player.gameId,
      squadId: player.squad.id,
      squadMemberId: player.squad.squadMembers.find(
        (s) => s.playerId == player.id
      ).id,
      lat: 59.9213924958088,
      lng: 10.80503367970039,
      startTime: new Date(Date.now()).toISOString(),
      endTime: new Date(Date.now()).toISOString(),
    };
    console.log(data);
    fetch(`${Endpoints.SQUADS_API}/${data.squadId}/check-in`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json().then((res) => console.warn("result", res)));
    window.location.reload();
  };
  
  const handleLeaveSquadYesClick = () => {
    setLeaveSquadDialogOpen(false);
    fetch(`${Endpoints.SQUADS_API}/${player.squad.id}/leave`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => console.warn("result", res)));
    console.log("Leave squad");
  };
  const handleLeaveSquadClick = () => setLeaveSquadDialogOpen(true);
  const [leaveSquadDialogOpen, setLeaveSquadDialogOpen] = useState();

  console.log(player.squad);

  return (
    <>
      {player.squad == null && squads != null && (
        <>
          <Title stickyHeader>Squads</Title>
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">Members alive</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"></Typography>
            </Grid>
            {squads.map((squad) => (
              <Grid key={squad.id} item xs={12}>
                <AccordionRowSquads s={squad} playerId={player.id} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {player.squad != null && (
        <>
          <div className={classes.squadTitle}>
            <Title stickyHeader>{player.squad.name}</Title>
            <Fab
              color="secondary"
              aria-label="Add Mission button"
              variant="extended"
              size="medium"
              onClick={handleLeaveSquadClick}
            >
              <>
                Leave
                <ExitToAppIcon />
              </>
            </Fab>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={leaveSquadDialogOpen}
            >
              <DialogTitle id="simple-dialog-title">
                Are you sure you want to leave this squad
              </DialogTitle>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLeaveSquadYesClick}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setLeaveSquadDialogOpen(false)}
              >
                Cancel
              </Button>
            </Dialog>
            <Fab
              color="secondary"
              aria-label="Add Mission button"
              variant="extended"
              size="medium"
              onClick={handleCheckinSquadClick}
            >
              <>
                Check in squad
                <AddLocation />
              </>
            </Fab>
          </div>
          {/* SQUADMEMBERS */}
          <Grid container>
            <Grid item container xs={10}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  SquadMembers
                </Typography>
              </Grid>
              {player.squad.squadMembers.map((sm) => (
                <Grid key={sm.id} container item xs={12}>
                  <Grid item xs={4}>
                    <Typography>{sm.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{sm.rank}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{sm.isHuman ? `Human` : `Zombie`}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* SQUAD CHECKINS */}
            <Grid item container xs={10}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  Last checkins:
                </Typography>
              </Grid>
              {player.squad.squadCheckins.map((sc) => (
                <Grid key={sc.id} container item>
                  <Grid item xs={4}>
                    <Typography>
                      {moment(`${sc.startTime}`).format("HH:mm, DD.MM")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Lat: {sc.lat}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Lng: {sc.lng}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
