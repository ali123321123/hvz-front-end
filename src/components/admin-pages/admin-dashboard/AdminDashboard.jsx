import React, { useEffect, useState } from "react";
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
import MenuItemsAdminDashboard from "./MenuItemsAdminDashboard";
import AppbarMainMenu from "../../shared/AppbarMainMenu";
import ImageCard from "./ImageCard";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { Delete } from "@material-ui/icons";
import EditGameImage from "../EditGameImage";

export default function AdminDashboard(props) {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    //Content container
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      borderRadius: "4px",
    },

    appBar: {
      //Keep appbar on top
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    //Shift appbar right the same amount as drawer width
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },

    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();

  //Group classes
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [game, setGame] = useState({});

  useEffect(() => {
    setGame(props.location.state);
  }, [props.location.state]);

  // useEffect(() => {
  //   if (!Auth.userIsLoggedIn()) {
  //     history.push("/");
  //   }
  // }, []);

  // DELETE request using fetch with set headers
  //     const requestOptions = {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: "Bearer my-token",
  //         "My-Custom-Header": "foobar",
  //       },
  //     };
  //     fetch(
  //       `https://localhost:44390/api/games/${game.id}`,
  //       requestOptions
  //     ).then(() => setStatus("Delete successful"));

  //ON BUTTON YES HANDLE FETCH
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppbarMainMenu
        menuTitle={`Dashboard | ${game.name}`}
        menuItems={<MenuItemsAdminDashboard game={game} />}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Player stats */}
            <Grid item xs={12} md={5} lg={5}>
              <PlayerStats game={game} />
            </Grid>

            {/* Game Avatar Image */}
            <Grid item xs={12} md={4} lg={4}>
              {/* <ImageCard game={game} /> */}
              <EditGameImage game={game} />
            </Grid>

            {/* Interactive Map */}
            <Grid item xs={12} md={5} lg={5}>
              <Paper className={fixedHeightPaper}>
                <TempInteractiveMap />
              </Paper>
            </Grid>

            {/* Mission Stats */}
            <Grid item xs={12} md={7} lg={7}>
              <Paper className={classes.paper}>
                <MissionStats game={game} />
              </Paper>
            </Grid>

            {/* Game Stats */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GameStats game={game} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
