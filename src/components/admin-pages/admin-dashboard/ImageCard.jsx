import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../../services/FetcherFunction";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import { Cloudinary } from "cloudinary-core";

import React from "react";

const ImageCard = ({ game }) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      textAlign: " center",
      objectFit: "cover",
    },
  }));
  const classes = useStyles();

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
  return (
    <div>
      {game ? (
        <Card className={classes.card}>
          <img
            src={cloudinaryCore.url(game.imageUrl)}
            alt="game avatar image"
            height="230px"
          />
        </Card>
      ) : null}
    </div>
  );
};

export default ImageCard;
