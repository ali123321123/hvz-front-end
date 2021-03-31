import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import "../shared/GameDetailPage.scss";
import GameDetailInteractiveMap from "./GameDetailInteractiveMap";
import GameDetailPlayerInfo from "./GameDetailPlayerInfo";
import Endpoints from "../../services/endpoints";
import { decodedToken, getTokenInStorage } from "../../utils/tokenHelper";
import { useMapEvents } from "react-leaflet";
import GameChat from "../chat/gamechat/GameChat";
import {
  Typography,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
  MuiThemeProvider,
} from "@material-ui/core";
import AppbarMainMenu from "../shared/AppbarMainMenu";
import MenuItemsAdminDashboard from "../admin-pages/admin-dashboard/MenuItemsAdminDashboard";
import { themeActive } from "../shared/themeGameCards";
import MissionStats from "./MissionStats";
import PlayerStats from "../admin-pages/admin-dashboard/PlayerStats";
import EditGameImage from "../admin-pages/EditGameImage";
import EditAvatarImage from "./EditAvatarImage";
import AccordionMissions from "./AccordionMissions";
import AccordianRowMissions from "./AccordianRowMissions";
import ImageCard from "../admin-pages/admin-dashboard/ImageCard";

function GameDetail() {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    //Content container
    container: {
      paddingTop: theme.spacing(18),
      paddingBottom: theme.spacing(4),
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      borderRadius: "4px",
    },

    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();

  const { id: gameId } = useParams();
  const history = useHistory();
  const token = decodedToken();

  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const {
    data: game,
    error: gameError,
  } = useSWR(`${Endpoints.GAME_API}/${gameId}`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);
  const [playAreaCoordinates, setPlayAreaCoordinates] = useState([]);

  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${gameId}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (players) {
      setPlayer(players.filter((p) => p.userId == token.unique_name)[0]);
    }
  }, [players]);
  useEffect(() => {
    if (gameError) {
      console.log(gameError);
      if (gameError.status === 404) {
        history.push("../*"); //TODO: GOTO ROOT (NOT FOUND) PAGE
      }
    }
    if (!game) {
      setLoading(true);
    } else {
      setLoading(false);
      setPlayAreaCoordinates([
        [game.nW_lat, game.nW_lng],
        [game.sE_lat, game.sE_lng],
      ]);
    }
  }, [game, gameError]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={classes.root}>
          <AppbarMainMenu menuTitle={` ${player.name} | ${game.name}`} />
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

                  {/* PROFILE AVATAR IMAGE | PLAYER INFO* */}
                  <Grid item xs={12} md={4} lg={4}>
                    <ImageCard game={game} />
                    <Typography> {player?.name}</Typography>
                    <Typography>
                      Bite code: &nbsp; {player?.biteCode}
                    </Typography>
                  </Grid>

                  {/* INTERACTIVE MAP */}
                  <Grid item xs={12} md={5} lg={5}>
                    <div>
                      <GameDetailInteractiveMap
                        playAreaCoordinates={playAreaCoordinates}
                        scrollWheelZoom={true}
                      />
                    </div>
                  </Grid>

                  {/* MISSION STATS*/}
                  <Grid item xs={12} md={7} lg={7}>
                    {/* <Paper className={classes.paper}> */}
                    <AccordionMissions game={game} player={player} />

                    {/* </Paper> */}
                  </Grid>

                  {/* SQUAD INFO*/}
                  <Grid item xs={12} md={5} lg={5}>
                    <Paper className={classes.paper}>
                      <Typography>Placeholder Squad</Typography>
                    </Paper>
                  </Grid>

                  {/* Game Stats */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography>Placeholder </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </main>
          </MuiThemeProvider>
        </div>
      )}
      {/* <GameChat /> */}
    </div>
  );
}

export default GameDetail;
