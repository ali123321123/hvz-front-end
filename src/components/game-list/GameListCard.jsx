import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  Button,
  ThemeProvider,
  Tooltip,
  Grid,
  Container,
} from "@material-ui/core";
import "./CardStyles.scss";
import "fontsource-roboto";
import theme from "../shared/theme";
import GameCardPopup from "./GameCardPopup";
import Moment from "moment";
import useSWR from "swr";
import { fetcher } from "../../services/FetcherFunction";
import { Cloudinary } from "cloudinary-core";

function GameListCard({ game }) {
  const moment = require("moment");
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const useStyles = makeStyles((theme) => ({
    media: {
      //paddingTop: "56.25%", // 16:9
      paddingTop: "75%", // 4:3
      objectFit: "cover",
      width: "80%",
      borderRadius: "100%",
      margin: "auto",
      marginTop: "2em",
      //  "&:hover": {
      boxShadow: "0px 0px 20px 5px #333",
      transition: "0.3s",
      //},
    },

    Typography: {
      color: "#25252b",
      body2: {
        color: "#25252b",
      },
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState();

  //Fetch players from game id

  const { data: getPlayers, error: playersError } = useSWR(
    `https://localhost:44390/api/games/${game.id}/players`,
    fetcher
  );

  useEffect(() => {
    if (getPlayers) {
      // setPlayer(Object.keys(players).length);
      setPlayers(getPlayers.length);
      //console.log(Object.keys(players).length);
    }
  }, [getPlayers]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  //If no image is uploaded display default image
  return (
    <>
      <div classes="root">
        <Card className="card">
          <p>Game id: {game.id}</p>
          <CardMedia
            className={classes.media}
            image={cloudinaryCore.url(game.imageUrl)}
            height="200px"
            title="game avatar"
          />
          <CardHeader
            className="header"
            title={game.name}
            subheader={
              game.gameState
                ? "In Progress"
                : !game.gameState && game.registrationOpen
                ? "Open for registration"
                : "Completed games"
            }
          />
          <CardContent>
            <Typography variant="body2" color="primary" component="p">
              {players} Registered Players
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              <span>Start Date &emsp; {} &emsp; End Date</span>
            </Typography>

            <Typography variant="body2" color="black" component="p">
              <Tooltip title="Game start">
                <span>
                  {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}|{" "}
                  {}
                </span>
              </Tooltip>

              <Tooltip title="Game End">
                <span>
                  {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
                </span>
              </Tooltip>
            </Typography>
          </CardContent>

          <CardContent>
            <Button
              onClick={handleClickOpen}
              className={classes.button}
              variant="button"
              color="secondary"
              component="p"
            >
              See More
            </Button>
          </CardContent>
        </Card>
      </div>
      {open && <GameCardPopup open={open} setOpen={setOpen} game={game} />}
    </>
  );
}

export default GameListCard;
