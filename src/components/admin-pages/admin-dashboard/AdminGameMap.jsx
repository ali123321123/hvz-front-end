import React, { useEffect, useState } from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../../map/Map";

function AdminGameMap({ game, missions }) {
  const [center, setCenter] = useState([]);
  const [gameArea, setGameArea] = useState([]);

  useEffect(() => {
    const x = (game.nW_lat + game.sE_lat) / 2;
    const y = (game.nW_lng + game.sE_lng) / 2;
    console.log(x, y);
    if (!(isNaN(x) || isNaN(y))) {
      setCenter([parseFloat(x), parseFloat(y)]);
    }
    setGameArea([
      [game.nW_lat, game.nW_lng],
      [game.sE_lat, game.sE_lng],
    ]);
  }, [game]);
  console.log(center);
  return (
    <>
      {center.length > 0 && (
        <Map center={center} scrollWheelZoom={true}>
          <Rectangle bounds={gameArea}/>
          {missions?.map((m) => (
            <Marker position={[m.lat, m.lng]}>
              <Popup>{m.name}</Popup>
            </Marker>
          ))}
        </Map>
      )}
    </>
  );
}

export default AdminGameMap;
