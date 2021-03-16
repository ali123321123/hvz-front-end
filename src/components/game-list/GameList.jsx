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
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";
import AppbarGameList from "./AppbarGameList";

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
      " .MuiDivider-root": {
        height: "2px",
      },
    },
    container: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();

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
          <AppbarGameList />
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
        </div>
      )}
    </>
  );
}

export default GameList;
