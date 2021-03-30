import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

function MapAddMarker({ setMarkerPosition }) {
  const [position, setPosition] = useState(null);
 
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setMarkerPosition(e.latlng);
    },
  });

  return <>{position && <Marker position={position} />}</>;
}

export default MapAddMarker;
