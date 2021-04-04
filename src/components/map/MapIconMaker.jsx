import L from "leaflet";

export const customMarkerIcon = (markerImage, customMarkerAnchor) => {
  return L.icon({
    iconUrl: markerImage,
    iconSize: [40, 50],
    iconAnchor: customMarkerAnchor,
  });
};
