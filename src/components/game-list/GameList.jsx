import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import theme from "../shared/theme";
import GameCardPopUp from "./GameCardPopup";

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

  const [gameCards, setGameCards] = useState([]);
  const [gameSquad, setGameSquad] = useState([]);

  const database = require("../../mockdata/mockDb.json");

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);
  const [squads, setSquads] = useState([]);

  //Filter out new array from game_state and registration
  useEffect(() => {
    setActiveGames(database.games.filter((f) => f.game_state));
    setCompletedGames(
      database.games.filter((f) => !f.game_state && !f.game_registration)
    );
    setupCommingGames(
      database.games.filter((f) => !f.game_state && f.game_registration)
    );

    setSquads(
      database.squads.filter((o1) =>
        database.games.some((o2) => o1.id === o2.id)
      )
    );
  }, [gameCards]);

  useEffect(() => {
    setGameCards(database.games);
    setGameSquad(database.squads);
  }, []);

  console.log(
    database.games.map((squad, i) => {
      let game = database.squads.find((id) => id.id === squad.id);
      return game;
    })
  );

  return (
    <div className={classes.root}>
      testing
      {gameCards && (
        <div>
          {squads.map((squad) => (
            <GameCardPopUp key={squad.id} squad={squad} />
          ))}
        </div>
      )}
      <Grid container justify="center">
        test
        {squads.map((squad) => (
          <GameCardPopUp key={squad.id} squad={squad} />
        ))}
      </Grid>
      <article>
        <Grid container justify="center">
          {gameSquad.map((squad) => {
            if (gameCards.some((game) => game.id === squad.id)) {
              return <GameCardPopUp squad={squad} />;
            }
          })}
        </Grid>
      </article>
      <Typography gutterBottom>
        {gameSquad.map((squad) => {
          if (completedGames.some((game) => game.id === squad.id)) {
            return `SQUAD ${squad.name}`;
          }
        })}
      </Typography>
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
