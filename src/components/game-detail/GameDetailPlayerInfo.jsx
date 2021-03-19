import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";

function GameDetailPlayerInfo({ gameId }) {
  //User token temp variables
  const userTokenId = 1;
  const userSquadId = 1;

  const { data: players, error: playersError } = useSWR(
    `https://localhost:44390/api/games/${gameId}/players`,
    fetcher
  );
  const { data: user, error: userError } = useSWR(
    `https://localhost:44390/api/Users/${userTokenId}`,
    fetcher
  );

  const { data: squad, error: squadError } = useSWR(
    `https://localhost:44390/api/squads/${userSquadId}`,
    fetcher
  );
  const [humanPlayers, setHumanPlayers] = useState([]);
  const [zombiePlayers, setZombiePlayers] = useState([]);

  const [player, setPlayer] = useState({});

  useEffect(() => {
    if (players) {
      setHumanPlayers(players.filter((p) => p.isHuman));
      setZombiePlayers(players.filter((p) => !p.isHuman));
      setPlayer(players.filter((p) => p.userId === userTokenId));
    }
  }, [players]);
  return (
    <aside>
      <div className="players">
        <h3>Humans: {humanPlayers.length}</h3>
        <h3>Zombies: {zombiePlayers.length}</h3>
      </div>
      <div className="userName">
        <h3>
          Player name: {player?.firstName} {player?.lastName}
        </h3>
      </div>
      <div className="squadName">
        <h3>Squad:</h3>
        <ul>
          {squad?.squadMembers.map((m) => (
            //Change playerId to playerName when database is updated
            <li>
              {m.rank} {m.playerId}
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
