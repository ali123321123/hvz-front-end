import React, { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
//import Marker from 'react-leaflet-enhanced-marker'
import {customMarkerIcon} from './MapIconMaker';

function MapAddMarker({ setMarkerPosition, markerImage }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setMarkerPosition(e.latlng);
    },
  });

  

  return (
    <>{position && <Marker icon={customMarkerIcon(markerImage)} position={position}/>} </>
  );
}

export default MapAddMarker;
