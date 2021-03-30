
import React from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../map/Map";

function GameCardPopupMap({ gameName, playAreaCoordinates, centerAreaCoordinates }) {
    
  return (
      
      
        <Map center={centerAreaCoordinates} zoomBounds={playAreaCoordinates} scrollWheelZoom={false}>
          <Rectangle bounds={playAreaCoordinates} />
        </Map>

  );
}

export default GameCardPopupMap;
