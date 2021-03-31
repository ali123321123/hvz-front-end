import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";

function Map(props) {
 
  return (
    <MapContainer center={props.center} zoom={props.zoom ? props.zoom : 2 } scrollWheelZoom={props.scrollWheelZoom}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.children}
  </MapContainer>
  
  );
}

export default Map;
