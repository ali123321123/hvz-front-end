import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";
import AppbarMainMenu from "../shared/AppbarMainMenu";
import MenuItemsGameList from "./MenuItemsGameList";
import { ReactComponent as HvZLogo } from "../../assets/logo_with_title.svg";

function GameList() {
  const { data: games, error: gamesError } = useSWR(
    "https://localhost:44390/api/games",
    fetcher
  );

  //const { data: squads, error: squadsError} = useSWR("https://localhost:44390/api/Games", fetcher);
  console.log(games, gamesError);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTypography-h4": {
        textAlign: "center",
      },
      "& .MuiTypography-colorPrimary": {
        color: "#333",
        fontWeight: "bold",
        padding: "1em",
      },
      "& .MuiDivider-root": {
        height: "2px",
        marginBottom: "2em",
        light: false,
      },
    },
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  const themeDark = createMuiTheme({
    palette: {
      background: {
        default: "#87CEA4",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  const themeLight = createMuiTheme({
    palette: {
      background: {
        default: "#03CEA4",
      },
    },
    divider: "#222222",
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
          <AppbarMainMenu
            menuTitle={"Dashboard | Insert Game Name"}
            menuItems={<MenuItemsGameList />}
          />
          <MuiThemeProvider theme={light ? themeLight : themeDark}>
            <CssBaseline />
            <div
              style={{
                marginTop: "4em",
                marginRight: "auto",
                marginLeft: "auto",
                width: "400px",
                zIndex: 100,
              }}
            >
              <HvZLogo />
            </div>

            <main className={classes.content}>
              <Container maxWidth="xl" className={classes.container}>
                <Grid container spacing={3}>
                  <section className="container">
                    <Typography variant="h4" color="primary" component="p">
                      Active games
                    </Typography>

                    <Divider variant="middle" />
                    <Grid container spacing={3}>
                      {activeGames.map((game) => (
                        <GameListCard key={game.id} game={game} />
                      ))}
                    </Grid>
                  </section>

                  <section className="container">
                    <Typography variant="h4" color="primary" component="p">
                      Upcoming games
                    </Typography>
                    <Divider />
                    <Grid container spacing={3}>
                      {upCommingGames.map((game) => (
                        <GameListCard key={game.id} game={game} />
                      ))}
                    </Grid>
                  </section>

                  <section className="container">
                    <Typography variant="h4" color="primary" component="p">
                      Completed games
                    </Typography>
                    <Divider />
                    <Grid container spacing={3}>
                      {completedGames.map((game) => (
                        <GameListCard key={game.id} game={game} />
                      ))}
                    </Grid>
                  </section>
                </Grid>
              </Container>
            </main>
          </MuiThemeProvider>
        </div>
      )}
    </>
  );
}

export default GameList;
