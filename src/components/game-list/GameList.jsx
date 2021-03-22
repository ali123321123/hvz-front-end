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

function GameList() {
  const { data: games, error: gamesError } = useSWR(
    "https://localhost:44390/api/games",
    fetcher
  );

  const useStyles = makeStyles((theme) => ({
    root: {
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

    content: {
      width: "100%",
      margin: "auto",
    },
  }));
  const classes = useStyles();

  const themeActive = createMuiTheme({
    palette: {
      primary: {
        //Font color
        main: "#9c27b0",
      },
      background: {
        default: "#0e101c",
      },
    },
    typography: {
      h3: {
        textAlign: "center",
        textDecoration: "underline",
        textDecorationColor: "#00ffd5",
        marginBottom: "0.6em",
      },
    },
    //Override MuiCard HoverColor
    overrides: {
      MuiCard: {
        root: {
          "&:hover": {
            boxShadow:
              "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
            boxShadow: "0px 0px 40px 15px #9c27b0",
            //backgroundColor: "#1bdf84",
          },
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: "20px",
        },
      },
    },
  });

  const themeUpcoming = createMuiTheme({
    palette: {
      primary: {
        //Font color
        main: "#ffd000",
      },
      background: {
        default: "#0e101c",
      },
    },
    typography: {
      h3: {
        textAlign: "center",
        textDecoration: "underline",
        textDecorationColor: "#00ffd5",
        marginBottom: "0.6em",
      },
    },

    //Override MuiCard HoverColor
    overrides: {
      MuiCard: {
        root: {
          "&:hover": {
            boxShadow:
              "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
            boxShadow: "0px 0px 40px 15px #ffd000",
            //backgroundColor: "#1bdf84",
          },
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: "20px",
        },
      },
    },
  });

  const themeCompleted = createMuiTheme({
    palette: {
      primary: {
        //Font color
        main: "#ff0062",
      },
      background: {
        default: "#0e101c",
      },
    },
    typography: {
      h3: {
        textAlign: "center",
        textDecoration: "underline",
        textDecorationColor: "#00ffd5",
        marginBottom: "0.6em",
      },
    },

    //Override MuiCard HoverColor
    overrides: {
      MuiCard: {
        root: {
          "&:hover": {
            boxShadow:
              "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
            boxShadow: "0px 0px 40px 15px #ff0062",
            //backgroundColor: "#1bdf84",
          },
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: "20px",
        },
      },
    },
  });

  //Toggle ColorTheme
  const [light, setLight] = useState(true);

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);
  //const [squads, setSquads] = useState([]);

  const [loading, setLoading] = useState(true);

  //Filter out new array from game_state and registration
  useEffect(() => {
    if (gamesError) {
      console.log(gamesError);
    }
    if (!games) {
      setLoading(true);
    } else {
      console.log(games);
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

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.root}>
          {/* APP BAR  */}
          <AppbarMainMenu
            menuTitle={"Dashboard | Insert Game Name"}
            menuItems={<MenuItemsGameList />}
          />

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

            <main className={classes.content}>
              <Container className={classes.container}>
                {/* ACTIVE GAMES */}
                <MuiThemeProvider theme={themeActive}>
                  <CssBaseline />
                  <article className="gameTitle">
                    <Typography variant="h3" color="primary" component="p">
                      Active games
                    </Typography>
                  </article>

                  <Divider variant="middle" />
                  <section>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {activeGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
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
                      spacing={2}
                      style={{ textAlign: "center", margin: "auto" }}
                    >
                      {upCommingGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
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
                      spacing={2}
                      style={{ textAlign: "center", margin: "auto" }}
                    >
                      {completedGames.map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                          <GameListCard key={game.id} game={game} />{" "}
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
