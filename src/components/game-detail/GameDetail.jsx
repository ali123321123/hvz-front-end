import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import "../shared/Leaflet.scss";
import GameDetailInteractiveMap from "./GameDetailInteractiveMap";
import Endpoints from "../../services/endpoints";
import { decodedToken, getTokenInStorage } from "../../utils/tokenHelper";
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
import { themeActive } from "../shared/themeGameCards";
import PlayerStats from "../admin-pages/admin-dashboard/PlayerStats";
import AccordionMissions from "./AccordionMissions";
import GameChat from "../chat/gamechat/GameChat";
import ImageCard from "../admin-pages/admin-dashboard/ImageCard";
import MenuItemsGameDetail from "./MenuItemsGameDetail";
import GameKillPopup from "./GameKillPopup";
import SquadTab from "./SquadTab"

function GameDetail() {
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

  const [open, setOpen] = useState(false);

  const KillPrompt = () => {
    setOpen(true);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={classes.root}>
          <AppbarMainMenu
            menuTitle={`  ${game.name}`}
            menuItems={<MenuItemsGameDetail game={game} player={player} />}
          />
          <MuiThemeProvider theme={themeActive}>
            <CssBaseline />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {/* Player stats */}
                  <Grid item xs={12} md={5} lg={5}>
                    <Typography variant="h5">
                      {player?.name} &nbsp; - &nbsp; {player?.biteCode}
                    </Typography>
                    <br />
                    <PlayerStats game={game} />
                  </Grid>

                  {/* PROFILE AVATAR IMAGE | PLAYER INFO* */}
                  <Grid item xs={12} md={4} lg={4}>
                    <ImageCard game={game} />
                  </Grid>

                  {/* INTERACTIVE MAP */}
                  <Grid item xs={12} md={5} lg={5}>
                    <GameDetailInteractiveMap
                      playAreaCoordinates={playAreaCoordinates}
                      scrollWheelZoom={true}
                    />
                  </Grid>

                  {/* MISSION STATS*/}
                  <Grid item xs={12} md={7} lg={7}>
                    {/* <Paper className={classes.paper}> */}
                    <AccordionMissions game={game} player={player} />

                    {/* </Paper> */}
                  </Grid>

                  {/* SQUAD INFO*/}
                  <Grid item xs={12} md={7} lg={7}>
                    <Paper className={classes.paper}>
                      <SquadTab player={player} gameId={game.id} />
                    </Paper>
                  </Grid>

                  {/* Game Stats */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography>Placeholder </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <GameKillPopup
                  open={open}
                  setOpen={setOpen}
                  player={player}
                  game={game}
                />
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
