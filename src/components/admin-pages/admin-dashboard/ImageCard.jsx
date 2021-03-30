import {
  Button,
  Card,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Cloudinary } from "cloudinary-core";
import { useState, useEffect } from "react";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import { useLocation } from "react-router-dom";

const ImageCard = ({ onClick }) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      textAlign: " center",
      objectFit: "cover",
    },

    roundButton: {
      position: "relative",
      display: "block",
      width: "60%",
      paddingBottom: "60%",
      borderRadius: "50%",
      overflow: "hidden",
      border: "4px dotted #df1b55",
      boxShadow: "0px 0px 40px 15px #df1b55",
      margin: "2em auto",
      "&:hover": {
        transition: "border  width  paddingBottom  ease-in-out .2s",
        boxShadow: "0px 0px 40px 15px #00ffd5",
        border: "4px dotted #00ffd5",
        width: "61%",
        paddingBottom: "61%",
      },
    },

    roundImage: {
      position: "absolute",
      display: "block",
      margin: " auto",
      maxHeight: "100%",
      maxWeight: "100%",
      // objectFit: "cover",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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
        <Tooltip
          arrow
          placement={"bottom"}
          aria-label="Upload image"
          title="Upload Image"
        >
          {/* <Card className={classes.card}> */}
          <Button onClick={onClick} className={classes.roundButton}>
            <img
              className={classes.roundImage}
              src={cloudinaryCore.url(games.imageUrl)}
              alt="game avatar image"
            />
          </Button>
        </Tooltip>
      ) : // </Card>
      null}
    </>
  );
};

export default ImageCard;
