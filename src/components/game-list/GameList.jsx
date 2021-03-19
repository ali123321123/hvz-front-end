import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import theme from "../shared/theme";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";
import { useHistory } from "react-router";

function GameList() {
    const history = useHistory();

  const { data: games, error: gamesError } = useSWR(
    "https://localhost:44390/api/games",
    fetcher
  );
  //const { data: squads, error: squadsError} = useSWR("https://localhost:44390/api/Games", fetcher);

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
  }));
  const classes = useStyles();

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);
  const [squads, setSquads] = useState([]);

  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.root}>
          <section className="container">
            <Typography variant="h4" color="primary" component="p">
              Active games
            </Typography>
            <Divider variant="middle" />
            <Grid container justify="center">
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
            <Grid container justify="center">
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
            <Grid container justify="center">
              {completedGames.map((game) => (
                <GameListCard key={game.id} game={game} />
              ))}
            </Grid>
          </section>
        </div>
      )}
    </>
  );
}

export default GameList;
