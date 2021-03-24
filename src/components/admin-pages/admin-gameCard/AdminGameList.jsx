import React from "react";
import { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Divider,
  ThemeProvider,
  Grid,
  Container,
} from "@material-ui/core";
import "../../game-list/CardStyles.scss";
import "fontsource-roboto";
import theme from "../../shared/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useSWR from "swr";
import { fetcher } from "../../../services/FetcherFunction";
import AdminCard from "./AdminCard";
import AppbarMainMenu from "../../shared/AppbarMainMenu";
import MenuItemsAdminCard from "./MenuItemsAdminCard";
import CreateGameCard from "./CreateGameCard";
import {
  themeActive,
  themeUpcoming,
  themeCompleted,
} from "../../shared/themeGameCards";
import Endpoints from "../../../services/endpoints";

function AdminGameList() {
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

    container: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(4),
      textAlign: "center",
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

  return (
    <>
      <div className={classes.root}>
        {/* APP BAR  */}
        <AppbarMainMenu
          menuTitle={"Admin | Games"}
          menuItems={<MenuItemsAdminCard />}
        />

        <ThemeProvider theme={theme}>
          <main>
            <Container maxWidth="lg">
              <MuiThemeProvider theme={themeActive}>
                <CssBaseline />
                {/* CREATE NEW GAME */}
                <section className={classes.container}>
                  <Grid
                    container
                    item
                    spacing={0}
                    align="center"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                      <CreateGameCard />
                    </Grid>
                  </Grid>
                </section>

                <Divider variant="middle" />
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
                        <AdminCard
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
                        <AdminCard key={game.id} game={game} />
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
                        <AdminCard key={game.id} game={game} />
                      </Grid>
                    ))}
                  </Grid>
                </section>
              </MuiThemeProvider>
            </Container>
          </main>
        </ThemeProvider>
      </div>
    </>
  );
}
export default AdminGameList;
