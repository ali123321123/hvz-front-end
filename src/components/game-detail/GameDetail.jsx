import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import "../shared/GameDetailPage.scss";
import GameDetailInteractiveMap from "./GameDetailInteractiveMap";
import GameDetailPlayerInfo from "./GameDetailPlayerInfo";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage } from "../../utils/tokenHelper";

function GameDetail() {
  const { id: gameId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const {
    data: game,
    error: gameError,
  } = useSWR(`${Endpoints.GAME_API}/${gameId}`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const [loading, setLoading] = useState(true);
  const [playAreaCoordinates, setPlayAreaCoordinates] = useState([]);

  useEffect(() => {
    if (gameError) {
      console.log(gameError);
      if (gameError.status === 404) {
        history.push("../*"); //TODO: GOTO ROOT (NOT FOUND) PAGE
      }
    }
    if (!game) {
      setLoading(true);
    } else {
      setLoading(false);
      setPlayAreaCoordinates([
        [game.nW_lat, game.nW_lng],
        [game.sE_lat, game.sE_lng],
      ]);
    }
  }, [game, gameError]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{game.name}</h2>
          <div className="gameDetailMap">
            <GameDetailInteractiveMap
              playAreaCoordinates={playAreaCoordinates}
            />
          </div>
          <GameDetailPlayerInfo game={game} />
        </div>
      )}
    </div>
  );
}

export default GameDetail;
