import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
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

export default function AdminDashboard(props) {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {},

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

  console.log("afmin", game);
  console.log(props.location.state.id, " game");
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

  const onClickDelete = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
    };
    fetch(`${Endpoints.GAME_API}/${props.location.state.id}`, requestOptions);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppbarMainMenu
        menuTitle={`Dashboard | ${game.name}`}
        menuItems={<MenuItemsAdminDashboard />}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Game Avatar Image */}
            <Grid item xs={12} md={3} lg={3}>
              <ImageCard game={game} />
            </Grid>
            {/* DELETE NEW GAME */}

            <article>
              <ListItem button onClick={onClickDelete}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete Game" />
              </ListItem>
            </article>

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
              <PlayerStats game={game} />
            </Grid>

            {/* Game Stats */}
            <Grid item xs={9}>
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
