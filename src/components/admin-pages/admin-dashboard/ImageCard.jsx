import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../../services/FetcherFunction";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import { Cloudinary } from "cloudinary-core";

import React from "react";

const ImageCard = () => {
  const useStyles = makeStyles((theme) => ({
    media: {
      height: "200px",
      objectFit: "cover",
    },
  }));
  const classes = useStyles();

  const { data: games, error: gamesError } = useSWR(
    "https://localhost:44390/api/games/4",
    fetcher
  );

  useEffect(() => {
    console.log(games);
  }, [games]);

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
  return (
    <div>
      {games ? (
        <Card>
          <img
            src={cloudinaryCore.url(games.imageUrl)}
            alt="game avatar image"
            height="260px"
          />
        </Card>
      ) : null}
    </div>
  );
};

export default ImageCard;
