import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage, decodedToken } from "../../utils/tokenHelper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
  useTheme,
  Fab,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Title from "../admin-pages/admin-dashboard/Title";
import AccordionRowSquads from "./AccordionRowSquads";
import { AddLocation } from "@material-ui/icons";

export default function SquadTab({ player, gameId }) {
  const history = useHistory();
  const token = decodedToken();
  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();
  const theme = useTheme();
  const moment = require("moment");

  const {
    data: squads,
    error: squadsError,
  } = useSWR(
    `${Endpoints.GAME_API}/${gameId}/squads`,
    (url) => fetcherToken(url, getTokenInStorage()),
    { refreshInterval: 10 }
  );

  const handleCheckinSquadClick = () => {
    console.log("checkin");
  };

  console.log(player.squad);

  // Makes sure the div is scrolled to bottom when new message is recieved
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

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
              <Typography variant="h6">SquadMembers</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6"></Typography>
            </Grid>
            {squads.map((squad) => (
              <Grid item xs={12}>
                <AccordionRowSquads s={squad} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {player.squad != null && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Title stickyHeader>Your squad: {player.squad.name}</Title>
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
            <Grid item container xs={5}>
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
                <Grid item xs={12}>
                  <Typography>{sm.name}</Typography>
                </Grid>
              ))}
            </Grid>

            {/* FACTION */}
            <Grid item container xs={5}>
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    borderBottom: "1px solid black",
                  }}
                >
                  Faction
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {player.squad.isHuman ? `Human` : `Zombie`}
                </Typography>
              </Grid>
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
                <Grid container item>
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
