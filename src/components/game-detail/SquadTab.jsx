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
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Title from "../admin-pages/admin-dashboard/Title";
import AccordionRowSquads from "./AccordionRowSquads";

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

  console.log(squads);

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
          <Grid container style={{textAlign: "center"}}>
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
      {player.squad != null && 
      (
        <Grid container >
        <Grid xs={5}>
            <Grid xs={12}>
                <Typography style={{ fontWeight: "bold", borderBottom:"1px solid black" }}>SquadMembers</Typography>
            </Grid>
            {player.squad.squadMembers.map(sm => (
                <Typography>{sm.name}</Typography>
            ))}
        </Grid>
        <Grid xs={5}>
            <Grid xs={12}>
                <Typography style={{ fontWeight: "bold", borderBottom:"1px solid black" }}>Faction</Typography>
            </Grid>
            <Typography>{player.squad.isHuman ? `Human` : `Zombie`}</Typography>
            
        </Grid>
    </Grid>
      )}
    </>
  );
}
