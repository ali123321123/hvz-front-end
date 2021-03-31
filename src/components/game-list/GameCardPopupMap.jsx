
import React from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../map/Map";

function GameCardPopupMap({ playAreaCoordinates, centerAreaCoordinates }) {
    
  return (
      
      
        <Map center={centerAreaCoordinates} zoom={15} scrollWheelZoom={false}>
          <Rectangle bounds={playAreaCoordinates} />
        </Map>

  );
}

export default GameCardPopupMap;
