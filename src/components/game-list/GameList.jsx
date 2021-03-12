import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function GameList() {
  const [gameCards, setGameCards] = useState([]);
  const database = require("../../mockdata/mockDb.json");

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);

  useEffect(() => {
    setActiveGames(database.games.filter((f) => f.game_state));
    setCompletedGames(
      database.games.filter((f) => !f.game_state && !f.game_registration)
    );
    setupCommingGames(
      database.games.filter((f) => !f.game_state && f.game_registration)
    );
  }, [gameCards]);

  useEffect(() => {
    setGameCards(database.games);
  }, []);

  return (
    <div>
      <section class="container">
        <h1>Active games</h1>
        <article>
          <Grid container justify="center">
            {activeGames.map((game) => (
              <GameListCard key={game.id} game={game} />
            ))}
          </Grid>
        </article>
      </section>

      <section class="container">
        <h1>Upcoming games</h1>
        <Grid container justify="center">
          {upCommingGames.map((game) => (
            <GameListCard key={game.id} game={game} />
          ))}
        </Grid>
      </section>

      <section class="container">
        <h1>Completed games</h1>
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
