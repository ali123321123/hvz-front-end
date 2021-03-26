
import React from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../map/Map";

function GameCardPopupMap({ gameName, playAreaCoordinates, centerAreaCoordinates }) {
    
  return (
      
      
        <Map center={centerAreaCoordinates} zoomBounds={playAreaCoordinates}>
          <Rectangle bounds={playAreaCoordinates} />
          <Marker position={centerAreaCoordinates}>
            <Popup>
              {gameName} playarea
            </Popup>
          </Marker>
        </Map>

  );
}

export default GameCardPopupMap;
