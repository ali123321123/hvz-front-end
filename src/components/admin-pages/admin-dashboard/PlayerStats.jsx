import { React, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { TableContainer } from "@material-ui/core";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import CalculateTime from "./CalculateTime";

export default function PlayerStats({ game }) {
  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const [humanPlayers, setHumanPlayers] = useState(0);
  const [zombiePlayers, setZombiePlayers] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    if (players) {
      setHumanPlayers(players.filter((h) => h.isHuman).length);

      if (players.length > 0) {
        setZombiePlayers(players.filter((h) => h.isHuman === false).length);
        setTotalPlayers(humanPlayers + zombiePlayers);
      }
    }
  }, [game, players]);

  return (
    <>
      <TableContainer style={{ textAlign: "center" }}>
        <CalculateTime game={game} />

        <section
          style={{
            position: "relative",
            width: "15vw",
            height: "15vw",
            padding: "5% 0",
            margin: "1em auto",
            border: "4px dashed white",
            borderRadius: "50%",
          }}
        >
          <article
            style={{
              top: "0",
              left: "0",
              width: "100%",
              height: " 100%",
            }}
          >
            <span
              style={{
                textAlign: "center",
                margin: "center",
              }}
            >
              <Typography variant="h4">
                {humanPlayers + zombiePlayers}
              </Typography>
              <Typography color="textPrimary">Players</Typography>
            </span>
          </article>
        </section>

        <Typography component="p" variant="h4" style={{ marginTop: "10px" }}>
          <span style={{ marginTop: "10px" }}>{humanPlayers}</span>
          &nbsp; &nbsp;
          <span style={{ marginTop: "10px" }}>{zombiePlayers}</span>
        </Typography>

        <Typography color="primary">Humans &nbsp; &nbsp; Zombies</Typography>
      </TableContainer>
    </>
  );
}
