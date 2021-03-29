import { Card, makeStyles } from "@material-ui/core";
import { Cloudinary } from "cloudinary-core";
import { useState, useEffect } from "react";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import { useLocation } from "react-router-dom";

const ImageCard = () => {
  const useStyles = makeStyles((theme) => ({
    card: {
      textAlign: " center",
      objectFit: "cover",
    },
  }));
  const classes = useStyles();
  const [game, setGame] = useState({});

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
  const location = useLocation();

  useEffect(() => {
    setGame(location.state);
  }, [location.state]);

  //Fetch games
  const {
    data: games,
    error: gamesError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  return (
    <>
      {games ? (
        <Card className={classes.card}>
          <img
            src={cloudinaryCore.url(games.imageUrl)}
            alt="game avatar image"
            height="230px"
          />
        </Card>
      ) : null}
    </>
  );
};

export default ImageCard;
