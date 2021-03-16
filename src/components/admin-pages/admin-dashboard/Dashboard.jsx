import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import TempInteractiveMap from "./TempInteractiveMap";
import GameStats from "./GameStats";
import MissionStats from "./MissionStats";
import PlayerStats from "./PlayerStats";
import Appbar from "../Appbar";

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },

    //Content container
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },

    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();

  //Group classes
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Player stats */}
            <Grid item xs={12} md={3} lg={3}>
              <PlayerStats />
            </Grid>

            {/* Mission Stats */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
                <MissionStats />
              </Paper>
            </Grid>

            {/* Interactive Map */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TempInteractiveMap />
              </Paper>
            </Grid>

            {/* Player stats */}
            <Grid item xs={12} md={3} lg={3}>
              <PlayerStats />
            </Grid>

            {/* Game Stats */}
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <GameStats />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
