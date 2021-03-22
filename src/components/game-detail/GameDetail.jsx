import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";

import "../shared/GameDetailPage.scss";
import GameDetailInteractiveMap from "./GameDetailInteractiveMap";
import GameDetailPlayerInfo from "./GameDetailPlayerInfo";

function GameDetail() {
  const { id: gameId } = useParams();
  

//   const { data: game, error: gameError } = useSWR(
//     `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_GAME_API}/${gameId}`,
//     fetcher
//   );
// console.log(process.env.REACT_APP_GAME_API);

  const { data: game, error: gameError } = useSWR(
    `https://localhost:44390/api/games/${gameId}`,
    fetcher
  );

  const history = useHistory();


  const [loading, setLoading] = useState(true);
  const [playAreaCoordinates, setPlayAreaCoordinates] = useState([]);

  useEffect(() => {
    if (gameError) {
      console.log(gameError);
      if(gameError.status === 404){
          history.push('../*') //TODO: GOTO ROOT (NOT FOUND) PAGE
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
          <GameDetailPlayerInfo gameId={gameId} />
        </div>
      )}
    </div>
  );
}

export default GameDetail;
