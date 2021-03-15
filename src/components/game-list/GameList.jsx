import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import theme from "../shared/theme";
import GameCardPopUp from "./GameCardPopup";
import { setActiveGames } from "../shared/API";

function GameList() {
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

  const database = require("../../mockdata/mockDb.json");
  const gameDatabase = database.games;
  const squadDatabase = database.squads;

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);
  const [squads, setSquads] = useState([]);

  //Filter out new array from game_state and registration
  useEffect(() => {
    setActiveGames(gameDatabase.filter((f) => f.game_state));
    setCompletedGames(
      gameDatabase.filter((f) => !f.game_state && !f.game_registration)
    );
    setupCommingGames(
      gameDatabase.filter((f) => !f.game_state && f.game_registration)
    );

    setSquads(
      squadDatabase.filter((squad) =>
        gameDatabase.some((game) => squad.game_id === game.id)
      )
    );
  }, []);

  return (
    <div className={classes.root}>
      <div>{squads.map((map) => `${map.name} | `)}</div>
      <GameCardPopUp setGameSquad={squadDatabase} />
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
  );
}

export default GameList;
