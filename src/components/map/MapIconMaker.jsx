import L from "leaflet";

export const customMarkerIcon = (markerImage) => {
  return L.icon({
    iconUrl: markerImage,
    iconSize: [40, 50]
  });
};
