import React, { useEffect, useState } from "react";
import { Rectangle, useMapEvents } from "react-leaflet";

function MapAddRectanglePlayArea({ size, rectangleCorners, setRectangleCorners }) {
  const [position, setPosition] = useState();
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (position) {
        console.log(position);
      switch (size) {
        case "s":
          setRectangleCorners([
            [position.lat + 0.003, position.lng - 0.001],
            [position.lat - 0.001, position.lng + 0.003],
          ]);
          break;
        case "m":
          setRectangleCorners([
            [position.lat + 0.005, position.lng - 0.003],
            [position.lat - 0.003, position.lng + 0.005],
          ]);
          break;
        case "l":
          setRectangleCorners([
            [position.lat + 0.007, position.lng - 0.005],
            [position.lat - 0.005, position.lng + 0.007],
          ]);
          break;
        case "xl":
          setRectangleCorners([
            [position.lat + 0.009, position.lng - 0.007],
            [position.lat - 0.007, position.lng + 0.009],
          ]);
          break;
        default:
          break;
      }
    }
  }, [position]);
  return <>{rectangleCorners.length >0 && <Rectangle bounds={rectangleCorners} />}</>;
}

export default MapAddRectanglePlayArea;
