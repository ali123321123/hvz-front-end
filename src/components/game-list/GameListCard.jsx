import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import "./CardStyles.scss";
import GameCardPopup from "./GameCardPopup";
import { Cloudinary } from "cloudinary-core";

function GameListCard({ game }) {
  const moment = require("moment");
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState();

  //Fetch players from game id
  useEffect(() => {
    setPlayers(game.countPlayers);
  }, [game]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <Card className="card">
          {/* <p>Game id: {game.id}</p> */}
          <CardMedia
            image={cloudinaryCore.url(game.imageUrl)}
            height="200px"
            title="game avatar"
          />
          <CardHeader
            className="header"
            title={game.name}
            subheader={
              game.gameStarted
                ? "In Progress"
                : game.registrationOpen
                ? "Open for registration"
                : game.gameComplete
                ? "Completed games"
                : "No Current Game"
            }
          />
          <CardContent>
            <Typography variant="body2" component="p">
              {players} Registered Players
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body1" component="p">
              <span>Start Date &emsp; {} &emsp; End Date</span>
            </Typography>

            <Typography variant="body2" component="p">
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
              variant="outlined"
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
