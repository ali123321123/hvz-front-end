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
            width: "25%",
            paddingBottom: "25% ",
            borderRadius: "50%",
            margin: "2em auto ",
            border: "2px dashed #00ffd5",
            // boxShadow: "0px 0px 40px 15px #00ffd5",
          }}
        >
          <article
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              margin: " 0",
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
              <Typography color="primary">Players</Typography>
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
