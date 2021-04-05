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
import { Link } from "react-router-dom";
import Auth from "../../utils/authentication";
import { getTokenInStorage, decodedToken } from "../../utils/tokenHelper";

function GameListCard({ game }) {
  const moment = require("moment");
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
 const token = decodedToken();
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState();

  //Fetch players from game id
  useEffect(() => {
    setPlayers(game.countPlayers);
  }, [game]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const goToGameDetail = () => {
    if (Auth.userIsLoggedIn()) {
      <Link
        to={{
          pathname: `/admin/game/${game.id}`,
          state: game,
        }}
      ></Link>;
    }
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
            title={game.name}
            subheader={
              game.gameStarted ? (
                <span style={{ color: "#9c27b0" }}>In Progress</span>
              ) : game.registrationOpen ? (
                <span style={{ color: "#9c27b0" }}>Open for registration</span>
              ) : game.gameComplete ? (
                <span style={{ color: "#9c27b0" }}>Completed games</span>
              ) : (
                <span style={{ color: "#9c27b0" }}>
                  Registration not yet open
                </span>
              )
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

          {game.players.some(p => p.userId == token?.unique_name)
          ? (
            <CardContent>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/game/${game.id}`,
                  state: game,
                }}
              >
                <Button
                  onClick={goToGameDetail}
                  variant="outlined"
                  color="secondary"
                  component="p"
                >
                  Go to Game
                </Button>
              </Link>
            </CardContent>
          ) : (
            <CardContent className="btnCard">
              <Button
                onClick={handleClickOpen}
                variant="outlined"
                color="secondary"
                component="p"
              >
                See More
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
      {open && <GameCardPopup open={open} setOpen={setOpen} game={game} />}
    </>
  );
}

export default GameListCard;
