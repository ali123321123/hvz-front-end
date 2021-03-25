import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import Endpoints from "../../services/endpoints";
import { useSelector } from "react-redux";
import { getTokenInStorage, decodedToken } from "../../utils/tokenHelper";

function GameDetailPlayerInfo({ game }) {
  const [humanPlayers, setHumanPlayers] = useState([]);
  const [zombiePlayers, setZombiePlayers] = useState([]);

  const [player, setPlayer] = useState({});

  const [playerSquad, setPlayerSquad] = useState({});

  const token = decodedToken();

  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  //TODO: squadMembers will be supported later (FIX THEN)
  const {
    data: gameSquads,
    error: gameSquadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (players) {
      setHumanPlayers(players.filter((p) => p.isHuman));
      setZombiePlayers(players.filter((p) => !p.isHuman));
      setPlayer(players.filter((p) => p.userId == token.unique_name)[0]);
    }
  }, [players]);

  useEffect(() => {
    if (gameSquads) {
      setPlayerSquad(
        gameSquads.filter((s) => s.squadMembers.playerId === player.id)[0] //Will work soon
      );
    }
  }, [gameSquads, player]);



  return (
    <aside>
      <div className="players">
        <h3>Humans: {humanPlayers.length}</h3>
        <h3>Zombies: {zombiePlayers.length}</h3>
      </div>
      <div className="userName">
        <h3>Player name: {player.name}</h3>
      </div>
      <div className="squadName">
        <h3>Squad:{playerSquad?.name}</h3>
        <ul>
          {playerSquad?.squadMembers?.map((m) => (
            <li>
              {m.rank} {m.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="biteCode">
        <h3>Bite code: {player?.biteCode}</h3>
      </div>
    </aside>
  );
}

export default GameDetailPlayerInfo;
