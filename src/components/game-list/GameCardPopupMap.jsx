
import React from "react";
import { Marker, Popup, Rectangle } from "react-leaflet";
import Map from "../map/Map";

function GameCardPopupMap({ playAreaCoordinates, centerAreaCoordinates }) {
    
  return (
      
      
        <Map center={centerAreaCoordinates} zoomBounds={playAreaCoordinates}>
          <Rectangle bounds={playAreaCoordinates} />
          <Marker position={centerAreaCoordinates}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>

  );
}

export default GameCardPopupMap;
