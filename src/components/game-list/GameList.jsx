import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container,
  ThemeProvider,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "../shared/theme";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";
import AppbarMainMenu from "../shared/AppbarMainMenu";
import MenuItemsGameList from "./MenuItemsGameList";
import { ReactComponent as HvZLogo } from "../../assets/logo_without_title.svg";
import {
  themeActive,
  themeUpcoming,
  themeCompleted,
} from "../shared/themeGameCards";
import Endpoints from "../../services/endpoints";

function GameList() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      position: "relative",

      "& .MuiTypography-h3": {
        textAlign: "center",
      },
      "& .MuiTypography-colorPrimary": {
        color: "#434346",
      },
      "& .MuiDivider-root": {
        height: "2px",
        marginBottom: "2em",
      },
    },
  }));
  const classes = useStyles();

  //Toggle ColorTheme
  const [light, setLight] = useState(true);

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);

  const [loading, setLoading] = useState(true);

  //Fetch games
  const { data: games, error: gamesError } = useSWR(
    `${Endpoints.GAME_API}`,
    fetcher
  );

  //Filter out new array from game_state and registration
  useEffect(() => {
    if (gamesError) {
      console.log(gamesError);
    }
    if (!games) {
      setLoading(true);
    } else {
      setActiveGames(games.filter((f) => f.gameState && !f.registrationOpen));
      setCompletedGames(
        games.filter((f) => !f.gameState && !f.registrationOpen)
      );
      setupCommingGames(
        games.filter((f) => !f.gameState && f.registrationOpen)
      );

      setLoading(false);
    }
  }, [games]);

<<<<<<< HEAD
  const themeLight = createMuiTheme({
    palette: {
      background: {
        default: "#e4f0e2",
      },
      text: {
        primary: "#000000",
      },
    },
  });

  const themeDark = createMuiTheme({
    palette: {
      background: {
        default: "#222222",
      },
      text: {
        primary: "#cec32e",
      },
    },
  });

=======
>>>>>>> 34acab14296ed0cae548aed63c32f5e117813778
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.root}>
          {/* APP BAR  */}
          <AppbarMainMenu menuItems={<MenuItemsGameList />} />
          <ThemeProvider theme={theme}>
            <div
              style={{
                marginTop: "6em",
                marginRight: "auto",
                marginLeft: "auto",
                width: "480px",
                zIndex: 100,
              }}
            >
              <HvZLogo className="logo" />
              <Divider variant="fullWidth" />
            </div>

            <main>
              <Container maxWidth="lg">
                <MuiThemeProvider theme={themeActive}>
                  <CssBaseline />

                  {/* ACTIVE GAMES */}

                  <article className="gameTitle">
                    <Typography variant="h3" color="primary" component="p">
                      Active games
                    </Typography>
                  </article>

                  <Divider variant="middle" />
                  <section>
                    <Grid
                      container
                      spacing={10}
                      align="center"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {activeGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard
                            key={game.id}
                            game={game}
                            className={classes.card}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </section>
                </MuiThemeProvider>

                {/* UCOMING GAMES */}
                <MuiThemeProvider theme={themeUpcoming}>
                  <CssBaseline />

                  <article className="gameTitle">
                    <Typography variant="h3" color="primary" component="p">
                      Upcoming games
                    </Typography>
                  </article>

                  <Divider />
                  <section className="container">
                    <Grid
                      container
                      spacing={10}
                      align="center"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {upCommingGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard key={game.id} game={game} />
                        </Grid>
                      ))}
                    </Grid>
                  </section>
                </MuiThemeProvider>

                {/* COMPLETED GAMES */}
                <MuiThemeProvider theme={themeCompleted}>
                  <CssBaseline />
                  <article className="gameTitle">
                    <Typography variant="h3" color="primary" component="p">
                      Completed games
                    </Typography>
                  </article>

                  <Divider />
                  <section className="container">
                    <Grid
                      container
                      spacing={10}
                      align="center"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {completedGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard key={game.id} game={game} />
                        </Grid>
                      ))}
                    </Grid>
                  </section>
                </MuiThemeProvider>
              </Container>
            </main>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}

export default GameList;
