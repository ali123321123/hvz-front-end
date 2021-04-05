import React, { useEffect, useState } from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import useSWR from "swr";
import Icons from "../../../utils/icons";
import Map from "../../map/Map";
import { customMarkerIcon } from "../../map/MapIconMaker";

function AdminGameMap({ game, missions, kills }) {
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
        <Map center={center} zoom={17} scrollWheelZoom={true}>
          <Rectangle bounds={gameArea} />
          {missions?.map((m) => {
            if (m.isHumaVisible && m.isZombiVisible) {
              return (
                <Marker position={[m.lat, m.lng]}>
                  <Popup>{m.name}</Popup>
                </Marker>
              );
            } else if (m.isHumanVisible && !m.isZombiVisible) {
              return (
                <Marker
                  icon={customMarkerIcon(Icons.humanMarker)}
                  position={[m.lat, m.lng]}
                >
                  <Popup>{m.name}</Popup>
                </Marker>
              );
            } else if (m.isZombiVisible && !m.isHumaVisible) {
              return (
                <Marker
                  Icon={customMarkerIcon(Icons.zombieMarker)}
                  position={[m.lat, m.lng]}
                >
                  <Popup>{m.name}</Popup>
                </Marker>
              );
            }
          })}
          {kills?.map((k) => (
            <Marker
              icon={customMarkerIcon(Icons.tombstone)}
              position={[k.lat, k.lng]}
            >
              <Popup>{k.story}</Popup>
            </Marker>
          ))}
        </Map>
      )}
    </>
  );
}

export default AdminGameMap;
