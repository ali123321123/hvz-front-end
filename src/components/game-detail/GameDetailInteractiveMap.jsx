import React, { useEffect, useState } from "react";
import Map from "../map/Map";
import { Marker, Popup, Rectangle } from "react-leaflet";
import MapAddMarker from "../map/MapAddMarker";
import Icons from "../../utils/icons";
import { customMarkerIcon } from "../map/MapIconMaker";

function GameDetailInteractiveMap({ playAreaCoordinates, kills }) {
  const [centerArea, setCenterArea] = useState(null);

  useEffect(() => {
    const x = (playAreaCoordinates[0][0] + playAreaCoordinates[1][0]) / 2;
    const y = (playAreaCoordinates[0][1] + playAreaCoordinates[1][1]) / 2;
    setCenterArea([x, y]);
  }, [playAreaCoordinates]);

  return (
    <>
      {centerArea && (
        <Map center={centerArea} zoom={17} scrollWheelZoom={true}>
          <Rectangle bounds={playAreaCoordinates} />
          {kills?.map((k) => (
              <Marker icon={customMarkerIcon(Icons.tombstone)} position={[k.lat, k.lng]}>
                  <Popup>
                      {k.story}
                  </Popup>
              </Marker> 
          ))}
        </Map>
      )}
    </>
  );
}

export default GameDetailInteractiveMap;
