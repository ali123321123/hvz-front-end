import React, { useEffect, useState } from "react";
import Map from "../map/Map";
import { Marker, Popup, Rectangle } from "react-leaflet";

function GameDetailInteractiveMap({playAreaCoordinates}) {

  const [centerArea, setCenterArea] = useState(null);

  useEffect(() => {
    const x = (playAreaCoordinates[0][0] + playAreaCoordinates[1][0]) / 2;
    const y = (playAreaCoordinates[0][1] + playAreaCoordinates[1][1]) / 2;
    setCenterArea([x, y]);
    
  }, [playAreaCoordinates]);

  return (
  <>
      {centerArea && (
        <Map center={centerArea} zoomBounds={playAreaCoordinates}>
          <Rectangle bounds={playAreaCoordinates} />
        </Map>
      )}
   </>
  );
}

export default GameDetailInteractiveMap;
