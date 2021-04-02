import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
  MuiThemeProvider,
} from "@material-ui/core";
import GameStats from "./GameStats";
import EditMissionStats from "./EditMissionStats";
import PlayerStats from "./PlayerStats";
import MenuItemsAdminDashboard from "./MenuItemsAdminDashboard";
import AppbarMainMenu from "../../shared/AppbarMainMenu";
import EditGameImage from "../EditGameImage";
import Auth from "../../../utils/authentication";
import { useHistory, useParams } from "react-router";
import { themeActive } from "../../shared/themeGameCards";
import useSWR from "swr";
import Endpoints from "../../../services/endpoints";
import { fetcherToken } from "../../../services/FetcherFunction";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import AdminGameMap from "./AdminGameMap";
import "../../shared/Leaflet.scss";

export default function AdminDashboard(props) {
  const { id: gameId } = useParams();
  const [game, setGame] = useState({});
  useEffect(() => {
    fetch(`${Endpoints.GAME_API}/${gameId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
      },
    }).then((res) =>
      res.json().then((res) => {
        console.warn("result", res);
        setGame(res);
      })
    );
    console.log(game);
  }, []);
  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.GAME_API}/${gameId}/missions`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );
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
  const history = useHistory();
  //Group classes
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //   const [game, setGame] = useState({});
  //   const [center, setCenter] = useState();
  //   const [gameArea, setGameArea] = useState([]);

  //   useEffect(() => {
  //     if (game) {
  //       console.log(game);
  //       const x = (game.nW_lat + game.sE_lat) / 2;
  //       const y = (game.nW_lng + game.sE_lng) / 2;
  //       console.log(x, y);
  //       setCenter([x, y]);
  //       setGameArea([
  //         [game.nW_lat, game.nW_lng],
  //         [game.sE_lat, game.sE_lng],
  //       ]);
  //     }
  //   }, [game]);

  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      if (!Auth.userIsAdmin()) {
        history.push("/");
      }
    }
  }, []);
  return (
    <div className={classes.root}>
      <AppbarMainMenu
        menuTitle={`Admin Dashboard`}
        menuItems={<MenuItemsAdminDashboard game={game} />}
      />
      <MuiThemeProvider theme={themeActive}>
        <CssBaseline />
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
                <EditGameImage game={game} />
              </Grid>

              {/* Interactive Map */}
              <Grid item xs={12} md={5} lg={5}>
                {game && <AdminGameMap game={game} missions={missions} />}
              </Grid>

              {/* Mission Stats */}
              <Grid item xs={12} md={7} lg={7}>
                <Paper className={classes.paper}>
                  <EditMissionStats game={game} />
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
      </MuiThemeProvider>
    </div>
  );
}
